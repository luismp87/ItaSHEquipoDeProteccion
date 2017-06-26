var almacen = {
	/*variables sobre usuario*/
	usuario: null,
	pass: null,
	origen: null,
	myArray: null,

	puesto_trabajo: null,
	numero_empleado: null,
	area: null,
	botas_seguridad: null,
	casco: null,
	guantes: null,
	faja: null,
	gafas: null,
	respirador_3m_6200: null,
	respirador_3m_8210: null,
	tapones_auditivos: null,
	munequeras: null,
	otros: null,
	observaciones: null,
	usuario: null,
	origen: null,
	fecha_alta: null,
	CreaSINOExiste: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios (usuario,pass,origen)");										
									},
	error: function(){
										//alert("Error al acceder a la Base de Datos");
										navigator.notification.alert("Error al acceder a la Base de Datos", null, "Error", "Aceptar");
									},
	Correcto: function(){
										//alert("Reserva guardada en espera de sincronización");
										navigator.notification.alert("Ejecución satisfactoria", null, "Correcto", "Aceptar");
									},
    GuardadoCorrectoLocal: function(){
										//alert("Reserva guardada en espera de sincronización");
										navigator.notification.alert("Se guardo la información en el dispositivo", null, "Correcto", "Aceptar");
									},
		/*FUNCION PARA LEER EN BASE DE DATOS*/
	leerNumeroUsuarios: function(){  
			almacen.db = window.openDatabase("ItaSHEDP","1.0","ItaSHEDP Storage",20000);    
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);    
			almacen.db.transaction(almacen.ConsultaNumeroDeUsuario, almacen.error, null);  
		},
									ConsultaNumeroDeUsuario: function(tx){
										tx.executeSql("SELECT count(*) as filas FROM usuarios", [], function(tx2, t){
											for(i = 0; i < t.rows.length; i++){
												$("#NumUsuarios").val("" + t.rows.item(i).filas); 
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("id_ext: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}

//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
										
		},
/*FUNCION PARA GUARDAR EN BASE DE DATOS*/
	guardarUsuario: function(myArray){		
		almacen.myArray	= myArray;        
			almacen.db = window.openDatabase("ItaSHEDP","1.0","ItaSHEDP Storage",20000);
			almacen.db.transaction(almacen.GuardarUsuario, almacen.error, null);
			
		},
									GuardarUsuario: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios (usuario,pass,origen)");
										    //navigator.notification.alert("longitud " +almacen.myArray.length ,null,"Listo","Aceptar");      
										    for(i = 0; i<almacen.myArray.length; i++) 
										    {
										    	if((almacen.myArray[i] != "") && (almacen.myArray[i] != undefined))
										    	{
										    		tx.executeSql("INSERT INTO usuarios (usuario,pass,origen) VALUES ('"+almacen.myArray[i]+"')");
										    		//$('#Origenes').append(new Option('Foo', 'foo', true, true));
    											}
        									}
									},
	/*FUNCION PARA ELIMINAR EN BASE DE DATOS*/
	eliminarUsuarios: function(tx){
			almacen.db = window.openDatabase("ItaSHEDP","1.0","ItaSHEDP Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.eliminarUsuariosQuery, almacen.error, almacen.Correcto);
		},
									eliminarUsuariosQuery: function(tx){
									tx.executeSql("DELETE FROM usuarios");
	},
	leerinformacionUsuario: function(tx){
			almacen.db = window.openDatabase("ItaSHEDP","1.0","ItaSHEDP Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.leerinfoUsuario, almacen.error, null);

	},
									leerinfoUsuario: function(tx){
										
									tx.executeSql("SELECT usuario,pass,origen FROM usuarios where upper(usuario) = upper('" +$('#txtusuario').val()+ "') and upper(pass) = upper('" +$('#txtcontrasena').val()+ "')", [], function(tx2, t){
									var encontroUsuario = 0;
									var usuariof = "";
									var origenf = "";
											for(i = 0; i < t.rows.length; i++)
							{
							encontroUsuario= 1;
							usuariof = t.rows.item(i).usuario;
							origenf = t.rows.item(i).origen;
							}

	if(encontroUsuario == 0)
	{
		navigator.notification.alert("Verifique su usuario y contraseña", null, "Advertencia", "Aceptar");
	}
	else if(encontroUsuario >= 1)
	{
		window.localStorage.setItem("user",usuariof);
		window.localStorage.setItem("origen",origenf);
		$("#textORIGEN").text("Origen de usuario: " + window.localStorage.getItem("origen").toUpperCase());
		//$("#txtcubo").val("");
		$('#txtusuario').val(""); 
        $('#txtcontrasena').val("");
 		window.location.href = '#Registro';
	}
//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
	
	},
	guardarRegistro: function(puesto_trabajo, numero_empleado,area,botas_seguridad,casco,guantes,faja,gafas,respirador_3m_6200,respirador_3m_8210,tapones_auditivos,munequeras,otros,observaciones,usuario,origen,fecha_alta){

		almacen.puesto_trabajo = puesto_trabajo;
		almacen.numero_empleado = numero_empleado;
		almacen.area = area;
		almacen.botas_seguridad = botas_seguridad;
		almacen.casco = casco;
		almacen.guantes = guantes;
		almacen.faja = faja;
		almacen.gafas = gafas;
		almacen.respirador_3m_6200 = respirador_3m_6200;
		almacen.respirador_3m_8210 = respirador_3m_8210;
		almacen.tapones_auditivos = tapones_auditivos;
		almacen.munequeras = munequeras;
		almacen.otros = otros;
		almacen.observaciones = observaciones;
		almacen.usuario = usuario;
		almacen.origen = origen;

		var d = new Date(); 		
		almacen.fecha_alta = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();
		
			almacen.db = window.openDatabase("ItaSHEDP","1.0","ItaSHEDP Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.GuardarRegistro, almacen.error, almacen.GuardadoCorrectoLocal);
			
		},
									GuardarRegistro: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS ita_sh_reg_equipo_proteccion (puesto_trabajo, numero_empleado,area,botas_seguridad,casco,guantes,faja,gafas,respirador_3m_6200,respirador_3m_8210,tapones_auditivos,munequeras,otros,observaciones,usuario,origen,fecha_alta)");
										tx.executeSql("INSERT INTO ita_sh_reg_equipo_proteccion (puesto_trabajo, numero_empleado,area,botas_seguridad,casco,guantes,faja,gafas,respirador_3m_6200,respirador_3m_8210,tapones_auditivos,munequeras,otros,observaciones,usuario,origen,fecha_alta) VALUES ('"+almacen.puesto_trabajo+"',"+almacen.numero_empleado+",'"+almacen.area+"','"+almacen.botas_seguridad+"','"+almacen.casco+"','"+almacen.guantes+"','"+almacen.faja+"','"+almacen.gafas+"','"+almacen.respirador_3m_6200+"','"+almacen.respirador_3m_8210+"','"+almacen.tapones_auditivos+"','"+almacen.munequeras+"','"+almacen.otros+"','"+almacen.observaciones+"','"+almacen.usuario+"','"+almacen.origen+"','"+almacen.fecha_alta+"')");       
										//alert("- "+ almacen.usuario + " - " + almacen.fechaderegistro);
										
		},
		leerinformacionregistrada_en_movil: function(tx){
			almacen.db = window.openDatabase("ItaSHEDP","1.0","ItaSHEDP Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, null, null);			
			almacen.db.transaction(almacen.leerinforegistrada_en_movil, null, null);

	},
									leerinforegistrada_en_movil: function(tx){
										
									tx.executeSql("SELECT puesto_trabajo, numero_empleado,area,botas_seguridad,casco,guantes,faja,gafas,respirador_3m_6200,respirador_3m_8210,tapones_auditivos,munequeras,otros,observaciones,usuario,origen,fecha_alta FROM ita_sh_reg_equipo_proteccion", [], function(tx2, t){
									var campos = "";
									var encontro = 0;
											for(i = 0; i < t.rows.length; i++){
							encontro = 1;
							campos = campos + "['"+ t.rows.item(i).puesto_trabajo +"','"+ t.rows.item(i).numero_empleado+"','"+t.rows.item(i).area+"','"+t.rows.item(i).botas_seguridad+"','"+t.rows.item(i).casco+"','"+t.rows.item(i).guantes+"','"+t.rows.item(i).faja+"','"+t.rows.item(i).gafas+"','"+t.rows.item(i).respirador_3m_6200+"','"+t.rows.item(i).respirador_3m_8210+"','"+t.rows.item(i).tapones_auditivos+"','"+t.rows.item(i).munequeras+"','"+t.rows.item(i).otros+"','"+t.rows.item(i).observaciones.replace(/[^a-zA-Z 0-9.]+/g,' ')+"','"+t.rows.item(i).usuario + "','"+t.rows.item(i).origen +"','"+t.rows.item(i).fecha_alta+"']";												
											                                  }
											

	if(encontro == 0)
	{
		//navigator.notification.alert("Sin información registrada por migrar al servidor", null, "Advertencia", "Aceptar");
	}
	else if(encontro == 1)
	{
		server.sincronizarRegistrados(campos);//Enviar a servidor
		//navigator.notification.alert("Se migro informacion local al servidor", null, "Advertencia", "Aceptar");
	}
//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
	
	},
	eliminarregistros: function(tx){
			almacen.db = window.openDatabase("ItaSHEDP","1.0","ItaSHEDP Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.eliminarreg, almacen.error, null);
		},
									eliminarreg: function(tx){
									tx.executeSql("DELETE FROM ita_sh_reg_equipo_proteccion");
	}


}