var EmployeeView = function(employee) {

	this.initialize = function() {
		this.el = $("<div/>");
		this.el.on('click', '.add-location-btn', this.addLocation);
		this.el.on('click', '.add-contact-btn', this.addContact);
	};

	this.addLocation = function(e) {
		e.preventDefault();
		console.log('addLocation');
		navigator.geolocation.getCurrentPosition(
			function(position) {
				$('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
			},
			function(){
				alert('Error getting location');
			}
		);
		return false;
	};

	this.addContact = function(e) {
		e.preventDefault();
		console.log('addContact');
		if (!navigator.contacts){
			app.showAlert('Contacts API not supported', "Error");
			return;
		}
		var contact = navigator.contacts.create();
		contact.name = {
			givenName: employee.firstName,
			familyName: employee.lastName
		};
		var phoneNumbers = [];
		phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
		phoneNumbers[1] = new ContactField('modile', employee.cellPhone, true); // prefered number
		contact.phoneNumbers = phoneNumbers;
		contact.save();
		return false;

	};

	this.render = function() {
		this.el.html(EmployeeView.template(employee));
		return this;
	};

	this.initialize();
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());