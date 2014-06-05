/**
 * Page des Fiches explicatives
 * 
 * @author Christian Renoulin
 */
Ext.define('MieuxTrierANantes.view.information.Informations', {
			extend : 'Ext.NavigationView',
			xtype : 'informations_xtype',
			config : {
				// Titre dans barre de bouton principale
				title : 'Fiches',
				// Icone dans la barre de bouton principale
				
				scrollable : true,
				items : [{
							xtype : 'informationsbuttonslist_xtype'
						}],
				defaultBackButtonText : "Retour"

			}
		});