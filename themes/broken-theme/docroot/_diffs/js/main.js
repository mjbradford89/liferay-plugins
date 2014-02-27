AUI().ready(
	'liferay-hudcrumbs', 'liferay-navigation-interaction', 'liferay-sign-in-modal',
	function(A) {
		var navigation = A.one('#navigation');

		if (navigation) {
			navigation.plug(Liferay.NavigationInteraction);
		}

		var siteBreadcrumbs = A.one('#breadcrumbs');

		if (siteBreadcrumbs) {
			siteBreadcrumbs.plug(A.Hudcrumbs);
		}

		A.getBody().delegate('click', eventHandler, 'a.logo');

		var eventHandler = function(event) {
			event.preventDefault();
			alert(event.currentTarget.attr('title'));
		}

		var signIn = A.one('li.sign-in a');

		if (signIn && signIn.getData('redirect') !== 'true') {
			signIn.plug(Liferay.SignInModal);
		}

		var liferayFooterEventHandler = function(event) {
			event.preventDefault();
			var modal = new A.Modal(
				{
					bodyContent: "<iframe style='display:block; height: 94%; margin:auto; width: 95%;' src='http://www.liferay.com'></iframe>",
					centered: true,
					destroyOnHide: false,
					headerContent: '<h3>Liferay.com</h3>',
					height: '80%',
					modal: true,
					render: '#modal',
					visible: true,
					width: '80%'
				}
			).render();
		}

		A.getBody().delegate('click', liferayFooterEventHandler, '#footer .liferay-link');

		var guestBreadcrumbs = A.all('#breadcrumbs.not-signed-in li > a');

		if(guestBreadcrumbs.size() > 0){
			guestBreadcrumbs.removeAttribute('href');

			var breadcrumbHandler = function (event) {
				event.preventDefault();
				A.io.request('/widget/web/guest/home/-/58',
					{
						on: {
							success: function() {
								var data = this.get('responseData');
								var modal = new A.Modal({
										bodyContent: data,
										centered: true,
										destroyOnHide: false,
										headerContent: '<h3>Sign In</h3>',
										height: 500,
										render: '#modal',
										width: 500
									}
								).render();
							}
						}
					}
				);
			};

			A.getBody().delegate('click', breadcrumbHandler, '#breadcrumbs.not-signed-in li > a');
		}
	}
);