var server = {
		puesto_trabajo : null,
        numero_empleado : null,
        area : null,
        botas_seguridad : null,
        casco : null,
        guantes : null,
        faja : null,
        gafas : null,
        respirador_3m_6200 : null,
        respirador_3m_8210 : null,
        tapones_auditivos : null,
        munequeras : null,
        otros : null,
        observaciones : null,
        fecha_alta: null,     
        usuario : null,
        origen : null,
        nombre_empleado : null,
        nombre_reviso : null, 

        nombre_sup_sh_realizo : null, 
        fecha_creacion_boleta : null, 
        folio_boleta : null, 
        causa_boleta : null, 
        observaciones_boleta : null, 
        nombre_sup_produccion : null,
           
               
/*ENVIAR AL SERVER EL CAPTURADO EN LA PANTALLA DE CARACTERISTICAS AL SERVIDOR UN SOLO REGISTRO*/
sincronizar: function(puesto_trabajo, numero_empleado,area,botas_seguridad,casco,guantes,faja,gafas,respirador_3m_6200,respirador_3m_8210,tapones_auditivos,munequeras,otros,observaciones,usuario,origen,nombre_empleado,nombre_reviso)
{

server.puesto_trabajo = puesto_trabajo; 
server.numero_empleado = numero_empleado; 
server.area = area; 
server.botas_seguridad = botas_seguridad; 
server.casco = casco; 
server.guantes = guantes; 
server.faja = faja; 
server.gafas = gafas; 
server.respirador_3m_6200 = respirador_3m_6200; 
server.respirador_3m_8210 = respirador_3m_8210; 
server.tapones_auditivos = tapones_auditivos; 
server.munequeras = munequeras; 
server.otros = otros;
server.observaciones = observaciones;
var d = new Date();
server.fecha_alta = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();     
var fecha_alta = server.fecha_alta;
server.usuario = usuario;
server.origen = origen;
server.nombre_empleado = nombre_empleado;
server.nombre_reviso = nombre_reviso;
 
$.ajax({
                method: 'POST',
				url: 'https://wsgili.laitaliana.com.mx:8081/wsSHEquipoDeProteccion/service1.asmx/insertarreg',				
                data: {puesto_trabajo: puesto_trabajo, 
					numero_empleado: numero_empleado,
					area: area,
					botas_seguridad: botas_seguridad,
					casco: casco,
					guantes: guantes,
					faja: faja,
					gafas: gafas,
					respirador_3m_6200: respirador_3m_6200,
					respirador_3m_8210: respirador_3m_8210,
					tapones_auditivos: tapones_auditivos,
					munequeras: munequeras,
					otros: otros,
					observaciones: observaciones,
					usuario: usuario,
					origen: origen,
					fecha_alta: fecha_alta,
                    nombre_empleado: nombre_empleado,
                    nombre_reviso: nombre_reviso},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 == "encontro")
                            {                           
                           		navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ",null,"Advertencia" ,"Aceptar");   
                           	    //$("#myPopup").popup("open")
                           	    $("#myPopup").popup("close");
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
        						$('#textOBSERVACIONES').val("");
                                $('#textNOMBRE_EMPLEADO').val("");
                               
                            }
                        else
                            {
                            navigator.notification.alert("Verifique la fecha del dispositivo no se guardo la información",null,"Error","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
                    //navigator.notification.alert(jq + txt.responseText,null,"Error","Aceptar");
                    navigator.notification.alert("Error de comunicación, se guarda la información en el dispositivo",null,"Error 785","Aceptar");

                    almacen.guardarRegistro(server.puesto_trabajo,server.numero_empleado,server.area,server.botas_seguridad,server.casco,server.guantes,server.faja,server.gafas,server.respirador_3m_6200,server.respirador_3m_8210,server.tapones_auditivos,server.munequeras,server.otros,server.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),server.usuario,server.origen,server.fecha_alta,server.nombre_empleado,server.nombre_reviso.replace(/[^a-zA-Z 0-9.]+/g,' '));
                               //$("#myPopup").popup("open")
                           	    $("#myPopup").popup("close");
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
        						$('#textOBSERVACIONES').val("");
                                $('#textNOMBRE_EMPLEADO').val("");
                                
				}
			}).done(server.sincronizado);


	},
		sincronizado: function(msg){
		/*if(msg == 1)
		{
			navigator.notification.alert("Los datos guardados se han sincronizado satisfactoriamente", null, "Sincronizado", "Aceptar");
			almacen.gurdarHistorial(server.pr,server.di,server.th);//Guardar en Historial
		}
		else
		{
			navigator.notification.alert("Hubo un error al intentar sincronizar los datos guardados", null, "Error", "Aceptar");
		}*/
		//navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ", null, "Advertencia", "Aceptar");
	},
            sincronizarRegistrados: function(puesto_trabajo){

            server.puesto_trabajo = puesto_trabajo;
            //navigator.notification.alert("enviando ser: " + puesto_trabajo,null,"mensaje 2","Aceptar");              
$.ajax({
                method: 'POST',
                url: 'https://wsgili.laitaliana.com.mx:8081/wsSHEquipoDeProteccion/service1.asmx/insertarreg_en_movil',               
                data: { puesto_trabajo: puesto_trabajo},
                dataType: "json",
                success: function (msg){
                    //$.mobile.loading("hide");
                    //$.each(msg,function(i,item){
                        //if(msg[i].valor1 == "encontro")
                            //{                           
                           //navigator.notification.alert("La información se envio al servidor de forma correcta",null,"Advertencia","Aceptar");   
                           almacen.eliminarregistros();
                           // }
                        //else
                           /// {
                           // navigator.notification.alert("Error al enviar la información al servidor",null,"Error 458","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                           /// }                        
                   // });                   
                },
                error: function(jq, txt){
                    //alert(jq + txt.responseText);
                    //navigator.notification.alert(id_ext+"-" +presion+"-" +manometro+"-" +segurosello+"-" +manguera+"-" +soporte+"-" +pintura+"-" +valvula+"-" +cilindro+"-" +nemotecnia+"-" +senalamiento+"-" +gabinete+"-" +observaciones+"-" +usuario+"-" +fechaderegistro ,null,"Error ajax","Aceptar");
                    //navigator.notification.alert("Error de comunicación para poder migrar la información almacenada en el dispositivo.",null,"Error - 456","Aceptar");
                }
            }).done(server.sincronizadoRegistrados);


    },
    sincronizadoRegistrados: function(msg){
        /*if(msg == 1)
        {
            navigator.notification.alert("Los datos guardados se han sincronizado satisfactoriamente", null, "Sincronizado", "Aceptar");
            almacen.gurdarHistorial(server.pr,server.di,server.th);//Guardar en Historial
        }
        else
        {
            navigator.notification.alert("Hubo un error al intentar sincronizar los datos guardados", null, "Error", "Aceptar");
        }*/
        //almacen.eliminarregistrosExt();
        //navigator.notification.alert("Los datos se guardaron remotamente satisfactoriamente ", null, "Advertencia", "Aceptar");
    },


    /*ENVIAR AL SERVER LA INFORMACION RELACIONADA CON EL ALTA DE BOLETA*/
sincronizar_3: function(numero_empleado,usuario,origen,nombre_empleado,nombre_sup_sh_realizo,fecha_creacion_boleta,folio_boleta,causa_boleta,observaciones_boleta,nombre_sup_produccion)
{

server.numero_empleado = numero_empleado;
server.usuario = usuario;
server.origen = origen;
server.nombre_empleado = nombre_empleado;
server.nombre_sup_sh_realizo = nombre_sup_sh_realizo;
server.fecha_creacion_boleta = fecha_creacion_boleta;
server.folio_boleta = folio_boleta;
server.causa_boleta = causa_boleta;
server.observaciones_boleta = observaciones_boleta;
server.nombre_sup_produccion = nombre_sup_produccion;
var d = new Date();
server.fecha_alta = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();     
var fecha_alta = server.fecha_alta;


$.ajax({
                method: 'POST',
                url: 'https://wsgili.laitaliana.com.mx:8081/wsSHEquipoDeProteccion/service1.asmx/insertarreg_3',                
                data: {
                    numero_empleado: numero_empleado,
                    usuario: usuario,
                    origen: origen,
                    nombre_empleado: nombre_empleado,
                    nombre_sup_sh_realizo: nombre_sup_sh_realizo,
                    fecha_creacion_boleta: fecha_creacion_boleta,
                    folio_boleta: folio_boleta,
                    causa_boleta: causa_boleta,
                    observaciones_boleta: observaciones_boleta,
                    nombre_sup_produccion: nombre_sup_produccion,
                    fecha_alta: fecha_alta},            
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 == "encontro")
                            {                           
                                navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ",null,"Advertencia" ,"Aceptar");   
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
                        else
                            {
                            navigator.notification.alert("Verifique la fecha del dispositivo no se guardo la información",null,"Error","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });                 
                },
                error: function(jq, txt){
                    
                    //alert(jq + txt.responseText);
                    //navigator.notification.alert(jq + txt.responseText,null,"Error","Aceptar");
                    navigator.notification.alert("Error de comunicación, se guarda la información en el dispositivo",null,"Error 785","Aceptar");

                    almacen.guardarRegistro_3(server.numero_empleado,server.usuario,server.origen,server.nombre_empleado,server.nombre_sup_sh_realizo,server.fecha_creacion_boleta,server.folio_boleta,server.causa_boleta,server.observaciones_boleta,server.nombre_sup_produccion,server.fecha_alta);
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
            }).done(server.sincronizado_3);


    },
        sincronizado_3: function(msg){
        /*if(msg == 1)
        {
            navigator.notification.alert("Los datos guardados se han sincronizado satisfactoriamente", null, "Sincronizado", "Aceptar");
            almacen.gurdarHistorial(server.pr,server.di,server.th);//Guardar en Historial
        }
        else
        {
            navigator.notification.alert("Hubo un error al intentar sincronizar los datos guardados", null, "Error", "Aceptar");
        }*/
        //navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ", null, "Advertencia", "Aceptar");
    },



        sincronizarRegistrados_3: function(numero_empleado){
            

            server.numero_empleado = numero_empleado;
            //navigator.notification.alert("enviando ser: " + puesto_trabajo,null,"mensaje 2","Aceptar");              
$.ajax({
                method: 'POST',
                url: 'https://wsgili.laitaliana.com.mx:8081/wsSHEquipoDeProteccion/service1.asmx/insertarreg_en_movil_3',               
                data: { numero_empleado: numero_empleado},
                dataType: "json",
                success: function (msg){
                    //$.mobile.loading("hide");
                    //$.each(msg,function(i,item){
                        //if(msg[i].valor1 == "encontro")
                            //{                           
                           //navigator.notification.alert("La información se envio al servidor de forma correcta",null,"Advertencia","Aceptar");   
                           almacen.eliminarregistros_3();
                           // }
                        //else
                           /// {
                           // navigator.notification.alert("Error al enviar la información al servidor",null,"Error 458","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                           /// }                        
                   // });                   
                },
                error: function(jq, txt){
                    //alert(jq + txt.responseText);
                    //navigator.notification.alert(id_ext+"-" +presion+"-" +manometro+"-" +segurosello+"-" +manguera+"-" +soporte+"-" +pintura+"-" +valvula+"-" +cilindro+"-" +nemotecnia+"-" +senalamiento+"-" +gabinete+"-" +observaciones+"-" +usuario+"-" +fechaderegistro ,null,"Error ajax","Aceptar");
                    //navigator.notification.alert("Error de comunicación para poder migrar la información almacenada en el dispositivo.",null,"Error - 456","Aceptar");
                }
            }).done(server.sincronizadoRegistrados_3);


    },
    sincronizadoRegistrados_3: function(msg){
        /*if(msg == 1)
        {
            navigator.notification.alert("Los datos guardados se han sincronizado satisfactoriamente", null, "Sincronizado", "Aceptar");
            almacen.gurdarHistorial(server.pr,server.di,server.th);//Guardar en Historial
        }
        else
        {
            navigator.notification.alert("Hubo un error al intentar sincronizar los datos guardados", null, "Error", "Aceptar");
        }*/
        //almacen.eliminarregistrosExt();
        //navigator.notification.alert("Los datos se guardaron remotamente satisfactoriamente ", null, "Advertencia", "Aceptar");
    }


};
