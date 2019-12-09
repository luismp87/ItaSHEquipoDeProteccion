var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){ 
    $('#textREVISO').val(""+ window.localStorage.getItem("revisa"));
    $('#textREVISO_3').val(""+ window.localStorage.getItem("revisa"));          
        if(window.localStorage.getItem("yamigrousuarios") != "SI")
        {          
        fn.btnMigrarUsuarios();  
        }
        
 
        if(fn.estaRegistrado() == false)
        {
        window.location.href = '#login';      
        }
        else
        {
        $("#textORIGEN").text("Origen de usuario: " + window.localStorage.getItem("origen").toUpperCase());
        $("#textORIGEN_2").text("Origen de usuario: " + window.localStorage.getItem("origen").toUpperCase());
        $("#textORIGEN_3").text("Origen de usuario: " + window.localStorage.getItem("origen").toUpperCase());
        window.location.href = '#Menu';     
        }
        //PARA MOVIL
        //$('#btnautentificar').tap(fn.autentificarSQL);   
        $('#btnautentificar').tap(fn.autentificarSERVER);  
        $('#BtnSalir').tap(fn.SalirYRestablecer);        
        $('#btnGuardarReg').tap(fn.GuardarReg);
        $('#btn_ir_asignacion_epp').tap(fn.ir_asignacion_epp);  
        $('#btn_ir_boletas_epp').tap(fn.ir_boletas_epp);  
        $('#btn_salir_sistema_epp').tap(fn.salir_sistema_epp);
        $('#BtnSalir_3').tap(fn.SalirYRestablecer_3); 
        $('#btn_buscar_por_n_empleado').tap(fn.buscar_por_n_empleado); 
        $('#btnGuardarReg_3').tap(fn.GuardarReg_3);
        
        $('#textNUMERO_EMPLEADO_3').keypress(function (e) {
            if (e.which == 13) {
           
            fn.buscar_por_n_empleado();
            

            }
        });

        
               
                
        //PARA MOVIL
         document.addEventListener("online", almacen.leerinformacionregistrada_en_movil, false);
         document.addEventListener("online", almacen.leerinformacionregistrada_boletas_en_movil, false);
        ////////////
 
	},
        btnMigrarUsuarios: function(){ 
        if(window.localStorage.getItem("yamigrousuarios") != "SI")
        {          
        var myArray = new Array(60); 
        var registros = $('#NumUsuarios').val();  
        if(registros == 0)
            {
                //$.mobile.loading("show",{theme: 'b'});
                $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsshequipodeproteccion/Service1.asmx/enviarcatalogocompletodeusuarios',              
                //data: {usuario: nom, contrasena: passw},
                dataType: "json",
                success: function (msg){
                    //$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        myArray[i] = msg[i].usuario + "','" + msg[i].pass + "','" + msg[i].origen;
                    }); 
                    almacen.guardarUsuario(myArray);
                    almacen.leerNumeroUsuarios();  
                    window.localStorage.setItem("yamigrousuarios","SI");
                    navigator.notification.alert("Migración Correcta de Usuarios",null,"Listo","Aceptar");               
        },
        error: function(jq, txt){
                    //alert("Error al migrar los usuarios del servidor, cierre y vuelva a abrir la aplicación para reintentar actualizar ó verifique su cobertura" +jq + txt.responseText);///*PARAWEB
                    navigator.notification.alert("Error al migrar los usuarios del servidor, cierre y vuelva a abrir la aplicación para reintentar actualizar ó verifique su cobertura" + jq + txt.responseText,null,"Error al migrar verifique su cobertura","Aceptar");///*PARAMOVIL
                }
            });
                    //navigator.notification.alert("a guardar",null,"Error al Ingresar","Aceptar");    
                            //almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio);
                    
                    }
                    else
                    {
                       //alert("Se tienen registros en la base de datos, antes eliminelos"); ///*PARAWEB
                       navigator.notification.alert("Se tienen registros en la base de datos, antes eliminelos",null,"Advertencia","Aceptar");///*PARAMOVIL    
                    }
        }
    },
    autentificarSERVER: function(){   

if($('#origen').val() == "")
{
    navigator.notification.alert("Seleccione un origen",null,"Seleccione un origen","Aceptar");
    return;
}

        var nom = $('#txtusuario').val().toLowerCase();
        var passw = $('#txtcontrasena').val();
        if(nom != '' && passw != ''){   
            $.mobile.loading("show",{theme: 'b'});
            $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/autentificar',              
                data: {usuario: nom, contrasena: passw},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 == "correcto")
                            {   
                           
                           $('#textREVISO').val(""+ msg[i].valor2);
                           $('#textREVISO_3').val(""+ msg[i].valor2);
                           window.localStorage.setItem("revisa",""+ msg[i].valor2);
                           window.localStorage.setItem("user",nom);
                           window.localStorage.setItem("origen",$('#origen').val());
                           $("#textORIGEN").text("Origen de usuario: " + window.localStorage.getItem("origen").toUpperCase());
                           $("#textORIGEN_2").text("Origen de usuario: " + window.localStorage.getItem("origen").toUpperCase());
                           $("#textORIGEN_3").text("Origen de usuario: " + window.localStorage.getItem("origen").toUpperCase());
                           $('#txtusuario').val(""); 
                           $('#txtcontrasena').val("");
                           $('#txtnumero_Empleado_realiza').val("");
                                //window.location.href = '#Registro';
                           window.location.href = '#Menu';                         

                             
                            navigator.notification.alert("Usuario y contraseña autentificados:  " + msg[i].valor2,null,"Error al Ingresar","Aceptar");
                            return;
                            }
                            else if(msg[i].valor2 == "El_usuario_no_es_de_SEGURIDAD_E_HIGIENE")
                            {
                            navigator.notification.alert("El usuario no pertenece a SEGURIDAD E HIGIENE",null,"Error al Ingresar","Aceptar");
                            return;                        
                            }
                            else
                            {
                            navigator.notification.alert("Usuario o contraseña incorrectos",null,"Error al Ingresar","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });                 
                },
                error: function(jq, txt){
                    //alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
                }
            });
        }
        else{
            navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
            //alert("todos los campos son requeridos");
        }   
    },
        autentificarSQL: function(){
        var usu = $('#txtusuario').val();      
        var con = $('#txtcontrasena').val();         

        if((usu != '') || (con != '')){   
            $.mobile.loading("show",{theme: 'b'});
            almacen.leerinformacionUsuario();
            $.mobile.loading("hide");
        }
        else{
            navigator.notification.alert("Ingrese los datos requeridos",null,"Error al Ingresar","Aceptar");///*PARAMOVIL
            //alert("Ingrese los datos requeridos");///*PARAWEB
        }   
    },
    estaRegistrado: function(){
        var usr = window.localStorage.getItem("user");
        if(usr == undefined || usr == '' || usr == null)
        {
            return false;
        }
        else
        {
            return true;
        }
    },
    SalirYRestablecer: function()
    {
         /*window.localStorage.setItem("user",'');
         window.localStorage.setItem("revisa",'');
         window.location.href = '#login'; */
         window.location.href = '#Menu';  
    },
    GuardarReg: function()
    {
       if(($('#textPUESTO_TRABAJO').val() != "") && ($('#textNUMERO_EMPLEADO').val() != ""))
        {
        

        fn.puesto_trabajo = $('#textPUESTO_TRABAJO').val();
        fn.numero_empleado = $('#textNUMERO_EMPLEADO').val();
        fn.area = $('#textAREA').val();
        fn.botas_seguridad = $('#textBOTAS_SEGURIDAD').val();
        fn.casco = $('#textCASCO').val();
        fn.guantes = $('#textGUANTES').val();
        fn.faja = $('#textFAJA').val();
        fn.gafas = $('#textGAFAS').val();
        fn.respirador_3m_6200 = $('#textRESPIRADOR3M6200').val();
        fn.respirador_3m_8210 = $('#textRESPIRADOR3M8210').val();
        fn.tapones_auditivos = $('#textTAPONESAUDITIVOS').val();
        fn.munequeras = $('#textMUNEQUERAS').val();
        fn.otros = $('#textOTROS').val();
        fn.observaciones = $('#textOBSERVACIONES').val();
        fn.usuario = window.localStorage.getItem("user");
        fn.origen = window.localStorage.getItem("origen");
        fn.nombre_empleado = $('#textNOMBRE_EMPLEADO').val();
        fn.nombre_reviso= $('#textREVISO').val();


        var d = new Date();
        fn.fecha_alta = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();     
        
   

        if(navigator.connection.type != Connection.NONE)
            {       
                        
                server.sincronizar(fn.puesto_trabajo,fn.numero_empleado,fn.area,fn.botas_seguridad,fn.casco,fn.guantes,fn.faja,fn.gafas,fn.respirador_3m_6200,fn.respirador_3m_8210,fn.tapones_auditivos,fn.munequeras,fn.otros,fn.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),window.localStorage.getItem("user"),window.localStorage.getItem("origen"),fn.nombre_empleado,fn.nombre_reviso.replace(/[^a-zA-Z 0-9.]+/g,' '));//Enviar a servidor                                
            }
            else
            {
                                almacen.guardarRegistro(fn.puesto_trabajo,fn.numero_empleado,fn.area,fn.botas_seguridad,fn.casco,fn.guantes,fn.faja,fn.gafas,fn.respirador_3m_6200,fn.respirador_3m_8210,fn.tapones_auditivos,fn.munequeras,fn.otros,fn.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),fn.usuario,fn.origen,fn.fecha_alta,fn.nombre_empleado,fn.nombre_reviso.replace(/[^a-zA-Z 0-9.]+/g,' '));
                               //$("#myPopup").popup("open")
                                
                                $('#textPUESTO_TRABAJO').val("");
                                $('#textNUMERO_EMPLEADO').val("");
                                $('#textAREA').val("");
                                $('#textBOTAS_SEGURIDAD').val("No").change();
                                $('#textCASCO').val("No").change();
                                $('#textGUANTES').val("No").change();
                                $('#textFAJA').val("No").change();
                                $('#textGAFAS').val("No").change();
                                $('#textRESPIRADOR3M6200').val("No").change();
                                $('#textRESPIRADOR3M8210').val("No").change();
                                $('#textTAPONESAUDITIVOS').val("No").change();
                                $('#textMUNEQUERAS').val("No").change();
                                $('#textOTROS').val("No").change();
                                $('#textNOMBRE_EMPLEADO').val("");
                                $('#textOBSERVACIONES').val("");
                                
                                $("#myPopup").popup("close");
            }


        }
        else
        {
        navigator.notification.alert("Ingrese Puesto y Número de empleado",null,"Advertencia","Aceptar");   
        $("#myPopup").popup("close");
        }

    },    
    ir_asignacion_epp: function()
    {
        window.location.href = '#Registro';     
    },    
    ir_boletas_epp: function()
    {
        window.location.href = '#RegistroBoleta';     
    },
    salir_sistema_epp: function()
    {
        window.localStorage.setItem("user",'');
         window.localStorage.setItem("revisa",'');
         window.location.href = '#login';
    },
    SalirYRestablecer_3: function()
    {
         /*window.localStorage.setItem("user",'');
         window.localStorage.setItem("revisa",'');
         window.location.href = '#login'; */
         window.location.href = '#Menu';  
    },
    buscar_por_n_empleado: function()
    {
        var n_empleado = $('#textNUMERO_EMPLEADO_3').val();         

        if(n_empleado != ''){           
            $.mobile.loading("show",{theme: 'b'});
            almacen.Consulta_informacion_empleado();
            //$.mobile.loading("hide");
        }
        else{
            navigator.notification.alert("Ingrese el # de empleado",null,"Error al Ingresar","Aceptar");///*PARAMOVIL
            //alert("Ingrese los datos requeridos");///*PARAWEB
        }   
    },
    GuardarReg_3: function()
    {
        var status = "BIEN";

           if(($('#textFOLIO_BOLETA').val() == "") && (status == "BIEN"))
           {
                status = "FALTAN";
                navigator.notification.alert("Ingrese el folio de boleta",null,"Advertencia","Aceptar");                           
           }


           if(($('#textNUMERO_EMPLEADO_3').val() == "") && (status == "BIEN"))
           {
                status = "FALTAN";
                navigator.notification.alert("Ingrese el Número de empleado",null,"Advertencia","Aceptar");             
           }

           if(($('#textFECHA_ALTA_BOLETA').val() == "") && (status == "BIEN"))
           {
                status = "FALTAN";
                navigator.notification.alert("Ingrese la fecha de creación de la boleta",null,"Advertencia","Aceptar");             
           }

           if(($('#Select option:selected').text() == "Seleccione el empleado") && (status == "BIEN"))
           {
                status = "FALTAN";
                navigator.notification.alert("Seleccione el nombre del empleado",null,"Advertencia","Aceptar");               
           }

           if(($("input:radio[name=acto]:checked").val() == "") && (status == "BIEN"))
           {
                status = "FALTAN";
                navigator.notification.alert("Seleccione una causa",null,"Advertencia","Aceptar");               
           }

           if(($('#textNOMBRE_DEL_SUPERVISOR').val() == "") && (status == "BIEN"))
           {
                status = "FALTAN";
                navigator.notification.alert("Ingrese el nombre del jefe inmediato del trabajador",null,"Advertencia","Aceptar");               
           }
        
      


       if(status == "BIEN")
        {            
        
        fn.numero_empleado = $('#textNUMERO_EMPLEADO_3').val();
        fn.usuario = window.localStorage.getItem("user");
        fn.origen = window.localStorage.getItem("origen");
        fn.nombre_empleado = $('#Select option:selected').text();//$('#Select').val();
        fn.nombre_sup_sh_realizo = $('#textREVISO_3').val();
        fn.fecha_creacion_boleta = $('#textFECHA_ALTA_BOLETA').val();
        fn.folio_boleta = $('#textFOLIO_BOLETA').val();
        fn.causa_boleta = $("input:radio[name=acto]:checked").val();
        fn.observaciones_boleta = $('#textDESCRIPCION_REPORTE').val()/*.replace(/[^a-zA-Z 0-9.]+/g,' ')*/;
        fn.nombre_sup_produccion = $('#textNOMBRE_DEL_SUPERVISOR').val()/*.replace(/[^a-zA-Z 0-9.]+/g,' ')*/;


        var d = new Date();
        fn.fecha_alta = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();      

   
        
        if(navigator.connection.type != Connection.NONE)
            {     
                server.sincronizar_3(fn.numero_empleado,fn.usuario,fn.origen,fn.nombre_empleado,fn.nombre_sup_sh_realizo,fn.fecha_creacion_boleta,fn.folio_boleta,fn.causa_boleta,fn.observaciones_boleta,fn.nombre_sup_produccion);//Enviar a servidor                                        
            }
            else
            {
                                almacen.guardarRegistro_3(fn.numero_empleado,fn.usuario,fn.origen,fn.nombre_empleado,fn.nombre_sup_sh_realizo,fn.fecha_creacion_boleta,fn.folio_boleta,fn.causa_boleta,fn.observaciones_boleta,fn.nombre_sup_produccion,fn.fecha_alta);
                               //$("#myPopup").popup("open")
                                $("#myPopup_3").popup("close");

                                $('#textNUMERO_EMPLEADO_3').val("");
                                $('select#Select option').remove();
                                $("#Select").append('<option value="0" selected>Seleccione el empleado</option>');
                                $('select#Select').val("0").change();
                                $('#textFECHA_ALTA_BOLETA').val("");
                                $('#textFOLIO_BOLETA').val("");
                                $('#textDESCRIPCION_REPORTE').val("");
                                $('#textNOMBRE_DEL_SUPERVISOR').val("");    
            }        
        }
        else
        {
            $("#myPopup_3").popup("close"); 
        }
        

    }

    


};
//$(fn.init);
$(fn.ready);