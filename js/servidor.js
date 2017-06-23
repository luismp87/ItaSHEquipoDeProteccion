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
        usuario: null,
        origen: null,
           
               
/*ENVIAR AL SERVER EL CAPTURADO EN LA PANTALLA DE CARACTERISTICAS AL SERVIDOR UN SOLO REGISTRO*/
sincronizar: function(puesto_trabajo, numero_empleado,area,botas_seguridad,casco,guantes,faja,gafas,respirador_3m_6200,respirador_3m_8210,tapones_auditivos,munequeras,otros,observaciones,usuario,origen){

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
var fechaderegistro = server.fecha_alta;
server.usuario = usuario;
server.origen = origen;

$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsshequipodeproteccion/Service1.asmx/insertarreg',				
                data: { puesto_trabajo: puesto_trabajo, 
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
					fechaderegistro: fechaderegistro},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 == "encontro")
                            {                           
                           navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ",null,"Advertencia" ,"Aceptar");   
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
                    navigator.notification.alert(jq + txt.responseText,null,"Error","Aceptar");
                    //navigator.notification.alert("Error de comunicación, se guarda la información en el dispositivo",null,"Error 785","Aceptar");

                    //almacen.guardarRegistroEXT(server.id_ext,server.presion,server.manometro,server.segurosello,server.manguera,server.soporte,server.pintura,server.valvula,server.cilindro,server.nemotecnia,server.senalamiento,server.gabinete,server.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),server.usuario);
                                 //$("#txtitaextiV1").val("");
                                //$("#textPRESION").val("OK").change();
                                //$("#textMANOMETRO").val("OK").change();
                                //$("#textSEGUROSELLO").val("OK").change();
                                //$("#textMANGUERA").val("OK").change();
                                //$("#textSOPORTE").val("OK").change();
                                //$("#textPINTURA").val("OK").change();
                                //$("#textVALVULA").val("OK").change();
                                //$("#textCILINDRO").val("OK").change();
                                //$("#textNEMOTECNIA").val("OK").change();
                                //$("#textSENALAMIENTO").val("OK").change();
                                //$("#textGABINETE").val("OK").change();
                                //$("#textOBSERVACIONES").val("");
                                //window.location.href = '#TiposDeCaptura';
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
	}


};
