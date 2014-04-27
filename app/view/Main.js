/**
 * Vue principale
 */
Ext.define('MieuxTrierANantes.view.Main', {

    extend: 'Ext.Carousel',
	xtype : 'main',
	id : 'mainView',
	requires: [
        'Ext.TabBar'
    ],
	config : {
		tabBar : {
			docked : 'bottom',
			layout : {
				pack : 'center'
			},
            scrollable: {
                direction: 'horizontal',
                indicators: false
            }
		},
		items : [
				{
					xclass : 'MieuxTrierANantes.view.garbages.Garbages'
				}, {
					 xclass : 'MieuxTrierANantes.view.geo.MapOSM'
				}, {
					xclass : 'MieuxTrierANantes.view.information.Informations'
				}, {
					xclass : 'MieuxTrierANantes.view.structures.Structures'
				}, {
					xclass : 'MieuxTrierANantes.view.homecollectmods.HomeCollectMods'
				}, {
					xclass : 'MieuxTrierANantes.view.trisac.Trisacs'
				}]
	}
});
