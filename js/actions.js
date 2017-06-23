var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){           
        //PARA MOVIL
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
        window.location.href = '#Registro';     
        }
        //PARA MOVIL
        $('#btnautentificar').tap(fn.autentificarSQL);   
        $('#BtnSalir').tap(fn.SalirYRestablecer);        
        $('#btnGuardarReg').tap(fn.GuardarReg); 
        //$('#btnGuardar').tap(fn.Guardar);   
        
        
        //PARA MOVIL
        //document.addEventListener("online", fn.btnMigrarUsuarios(), false);
        ////////////
 
	},
        btnMigrarUsuarios: function(){ 
        if(window.localStorage.getItem("yamigrousuarios") != "SI")
        {         
        var myArray = new Array(30); 
        var registros = $('#NumUsuarios').val();  
        if(registros == 0)
            {
                $.mobile.loading("show",{theme: 'b'});
                $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsshequipodeproteccion/Service1.asmx/enviarcatalogocompletodeusuarios',              
                //data: {usuario: nom, contrasena: passw},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
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
         window.localStorage.setItem("user",'');
         window.location.href = '#login';   
    },
    GuardarReg: function()
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
   

        if(navigator.connection.type != Connection.NONE)
            {                
                server.sincronizar(fn.puesto_trabajo,fn.numero_empleado,fn.area,fn.botas_seguridad,fn.casco,fn.guantes,fn.faja,fn.gafas,fn.respirador_3m_6200,fn.respirador_3m_8210,fn.tapones_auditivos,fn.munequeras,fn.otros,fn.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),window.localStorage.getItem("user"),window.localStorage.getItem("origen"));//Enviar a servidor                                
            }

    }/*,
    Guardar: function(){
        if(($('#textPUESTO_TRABAJO').val() != "") && ($('#textNUMERO_EMPLEADO').val() != ""))
        {
         $('#myPopup').show();
        }
        else
        {
            navigator.notification.alert("Ingrese Puesto y Número de empleado",null,"Advertencia","Aceptar");   
             $('#myPopup').hide();
        }

    }*/

};
//$(fn.init);
$(fn.ready);