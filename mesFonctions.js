function initialize() {
		// création de la carte et paramétrage général : centre et niveau de zoom
        var map = L.map('mapid').setView([50.172669, 1.802510], 10);
 
		// création d'une couche "osmLayer"
        var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        });
		    
		// la couche "osmG2FLayer" est ajoutée à la carte		
        map.addLayer(osmLayer);

		// création d'une couche "osmG2FLayer"
        var osmG2FLayer = L.tileLayer.wms('https://osm.geo2france.fr/mapproxy/service/', {layers: 'bright',
            attribution: '© Géo2France et <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        });
		    

		

		
		// création d'une couche geoJson qui appelle le fichier "pnr_perim.geojson"			
		var pnr = $.getJSON("pnr_perim.geojson",function(dataPnr)
					{L.geoJson( dataPnr, 
						{style: function(feature)
							{	
							// paramétrage de la symbologie de la couche "pnr"
							return { color: "#00997a", weight: 3, fillColor: '#00997a', fillOpacity: 0 };
							},
		onEachFeature: function( feature, layer )
				{
				// paramétrage de la popup de la couche "pnr"	
				layer.bindPopup( "<b><u>Parc Naturel Régional</u></b><br><b><u>Baie de Somme - Picaride maritime</u></b><br>" + feature.properties.nb_com + " communes adhérentes<br>" + feature.properties.area_ha + " hectares" )
				}
		}).addTo(map);
		});
	

		// création d'une couche geoJson qui appelle le fichier "pah_perim.geojson"			
		//var pah = $.getJSON("pah_perim.geojson",function(dataPah)
		//			{L.geoJson( dataPah, 
		//				{style: function(feature)
		//					{	
							// paramétrage de la symbologie de la couche "pah"
		//					return { color: "#319098", weight: 0, fillColor: '#319098', fillOpacity: .3 };
		//					},
		//onEachFeature: function( feature, layer )
		//		{
				// paramétrage de la popup de la couche "pah"	
		//		layer.bindPopup( "<b>Pays d'Art et d'Histoire</b><br><b>Ponthieu - Baie de Somme</b>")
		//		}
	//	}).addTo(map);
	//	});

		// création du style des circuits
		function getColor(d) {
			return d == '1' ? '#8A2BE2' :
				   d == '2' ? '#e0be25' :
				   d == '3' ? '#006400' :
				   d == '4' ? '#9932CC' :
				   d == '5' ? '#FF8C00' :
				   		      '#e0be25' ;
		};

		function style(feature) 
							{
							return {
								weight : 2,
								opacity: 1,
								color: getColor(feature.properties.id)
							};
						}

		// création d'une couche geoJson qui appelle le fichier "circuits_long_v1.geojson"			
		var circuit = $.getJSON("circuits_long_v1.geojson",function(dataCircuit)
					{L.geoJson( dataCircuit, 
						{style: function(feature) 
							{
							return {
								weight : 5,
								opacity: 1,
								color: getColor(feature.properties.id)
							};
						},
		onEachFeature: function( feature, layer )
				{
				// paramétrage de la popup de la couche "com"	
				layer.bindPopup( '<b>'+ feature.properties.nom + '</b><br>'
								+ "Distance : " + feature.properties.distance + '<br>'
								+ feature.properties.duree_pied + " à pied" + '<br>'
								+ feature.properties.duree_velo + " à vélo")
				}
		}).addTo(map);
		});

						
		// création d'une couche geoJson qui appelle le fichier "projet_pat.geojson"													
		var projets= $.getJSON("test_point.geojson",function(dataPoint)
										// icone Clap	
										{var iconeProjet = L.icon({
													iconUrl: 'style/church1.png',
													iconSize: [32, 32]
																	});
		// fonction pointToLayer qui ajoute la couche "projets" à la carte, selon la symbologie "iconeProjet", et paramètre la popup
		L.geoJson(dataPoint,{
			pointToLayer: function(feature,latlng){
				var marker = L.marker(latlng,{icon: iconeProjet});
				marker.bindPopup('<b><u>Description du projet</u></b><br>'
							   + "<b>Commune : </b>" + feature.properties.nom+ '<br>' 
							   + "<b>Type de patrimoine : </b>" + feature.properties.Typo
							   );
				return marker;
				}
						}).addTo(map);
										});				

		// gestion de l'affichage de la couche selon le zoom													
		


		// création d'un contrôle des couches pour modifier les couches de fond de plan	
		var baseLayers = {
			"OpenStreetMap": osmLayer,
			"OSM_Géo2France" : osmG2FLayer
		};

		L.control.layers(baseLayers).addTo(map);

}