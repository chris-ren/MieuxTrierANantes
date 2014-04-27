/**
 * Controlleur pour les vues et modèles de Carte
 * 
 * <p>
 * Pour information : Classe Carte Wrapper Carte Google Lire :
 * https://developers.google.com/maps/documentation/javascript/reference?hl=fr#ControlPosition
 * http://leafletjs.com/reference.html#marker
 * </p>
 * 
 * 
 * 
 * 
 * 
 */
 
 
/* Controlleur Carte */

Ext.define('MieuxTrierANantes.controller.GeoController', {
    extend : 'MieuxTrierANantes.controller.AbstractController',
    requires : ['Ext.MessageBox'],
    config : {
        refs : {
            vanmaposm : {
                selector : 'vanmaposm',
                xtype : 'vanmaposm',
                autoCreate : true
            }
        },
        control : {
            vanmaposm : {
                activate : 'onMapActivate',
                maplrender : 'onMapRender'
            }
         
        }
    },

    init : function() {
      
    },

    resetCenter : function(geo) {
        localStorage.setItem('latitude', geo.getLatitude());
        localStorage.setItem('longitude', geo.getLongitude());

        this.resetCenterPosition(geo);

    },

    /**
     * Remettre à Zero le centre
     * 
     * @param {}
     *            geo
     */
    resetCenterPosition : function(geo) {
        var me = this;

        console.log('latitude : ' + geo.getLatitude() + ' - longitude :'
                + geo.getLongitude());
        if (Ext.isDefined(me.getVanmaposm())) {
            var map = me.getVanmaposm().map;
            if (Ext.isDefined(map)) {

                var position = new L.LatLng(geo.getLatitude(), geo
                                .getLongitude());

                if (!Ext.isDefined(map.center)) {
                    map.center = new L.Marker(position);
                    map.addLayer(map.center);
                    map.center.setIcon(me.greenIcon);
                }

                map.center.setLatLng(position);

                if (!map.hasLayer(me.cloudmade)) {
                    map.addLayer(me.cloudmade);
                }
                map.setView(
                        new L.LatLng(geo.getLatitude(), geo.getLongitude()),
                        map.getZoom());
            } else {
                console.log('map non encore disponible');
            }
        }

    },


    /**
     * Action à l'initialisation de la Carte
     */
    onInitMap : function() {
        console.log('initMap');

    },

    /**
     * Action sur le changement de centre (propre Ext.Map)
     * 
     * @param {}
     *            extmap
     * @param {}
     *            map
     * @param {}
     *            center
     * @param {}
     *            eOpts
     */
    onCenterChange : function(extmap, map, center, eOpts) {
        // console.log(center);

    },

    /**
     * Positionner les structures
     * 
     */
    onLoadStructureStore : function() {

        console.log('onLoadStructureStore');
        var me = this;
        var map = this.getVanmaposm();
        
        this.structureGeoStore.each(function(record,index, count) {

             	map.addStructure(record);
     
             
         });
         
         map.render();

    },

    /**
     * Action réalisée après le rendu de la carte
     * 
     * @param {}
     *            extmap
     * @param {}
     *            map
     * @param {}
     *            eOpts
     */
    onMapRender : function(extmap, map, eOpts) {
    	
    	console.log('onMapRender');
    	var map = this.getVanmaposm(); 
        map.init();

        var me = this;
        
        // GEOLOCALISATION DESACTIVEE pour l'instant
        //A l'initialisation de la carte, on crée une variable du
        // controller pour gérer la modification de localisation
        // gérant la réactualisation en fonction de la postion
    	
       if (!Ext.isDefined(me.geolocate)) {
            me.geolocate = Ext.create('Ext.util.Geolocation', {
                        autoUpdate : true,
                        listeners : {
                            locationupdate : function(geo) {
                                me.resetCenter(geo);
                            },
                            locationerror : function(geo, bTimeout,
                                    bPermissionDenied, bLocationUnavailable,
                                    message) {
                                if (bTimeout) {
                                   // console.error('locationerror Timeout');
                                } else {
                                   // console.error('locationerror Erreur');
                                }
                            }
                        }
                    });
             
        }

        
        if (!Ext.isDefined(this.structureGeoStore)) {
            this.structureGeoStore = Ext.create('MieuxTrierANantes.store.StructureGeoStore',
                    {
                        autoLoad : true,
                        listeners : {
                            'load' : function(store, results, successful) {
                                console.log("Loading StructureGeoStore");
                                me.onLoadStructureStore();
                                me.geolocate.updateLocation();
                            }

                        }
                    });
        };
		
    },

    /**
     * Action réalisée lorsqu'on active le panel Carte
     */
    onMapActivate : function(container, newc) {
        console.log('onMapActivate');     

        
       this.verifyFirstTimeMap();
    },

    /**
     * Vérification du premier accès à la carte. Il faudrait mutualiser cette
     * méthode (côté Framework)
     */
    verifyFirstTimeMap : function() {
        console.log('verifier');
        if (localStorage.getItem('alreadyAccessMap') != 'true') {
           /* Ext.Msg
                    .alert(
                            'Carte',
                            'C\'est la première fois que vous accédez à la carte (pour la maquette de VAN). On peut mettre une aide ici.',
                            Ext.emptyFn);*/
            localStorage.setItem('alreadyAccessMap', 'true');
        }
    }


});