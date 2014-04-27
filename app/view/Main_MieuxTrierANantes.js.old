/**
 * Vue principale
 */
Ext.define('MieuxTrierANantes.view.Main', {

	extend : 'Ext.Carousel',
	xtype : 'main',
	id : 'mainView',
	requires : ['Ext.TabBar'],
	config : {
		tabBar : {
			docked : 'bottom',
			layout : {
				pack : 'center'
			},
			scrollable : {
				direction : 'horizontal',
				indicators : false
			}
		},
		items : [{
					xtype : 'garbages_xtype'
				}, {
					xtype : 'vanmaposm'
				}, {
					xtype : 'informations'
				}, {
					xtype : 'structuresView_xtype'
				}, {
					xtype : 'HomeCollectModsView'
				}, {
					xtype : 'Trisac_xtype'
				}]
	}
});
