class AppContainer extends React.Component { //parent Component
              constructor() {
                super();

                this.state = {
                  contactsList: [
                    {id:this._generateUID(), name: 'Tom Brace', phone: '0123456789', address:'fg dfgh dfgh dfgh dfgh', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
                    {id:this._generateUID(), name: 'Kyle Barclay', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
                    {id:this._generateUID(), name: 'Burt Lancaster', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
                    {id:this._generateUID(), name: 'Jeannie Kyler', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
                    {id:this._generateUID(), name: 'Ursella Phyllida', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
                    {id:this._generateUID(), name: 'John Smith', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
                    {id:this._generateUID(), name: 'Dave Johnson', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''}
                  ],
                  selectedContact: {},
                  isEditing: false
                }
              }

              componentDidMount() { //deafult to fist contact when app loads
                  this._updateContact(this.state.contactsList[0]);
              }

              render(){
                return(
                  <div className="container-fluid">
                    <div className="row">
                      <div id="sidebar" className="col-xs-12 col-md-3 sidebar">
                        <ContactNav
                          updateSelectedContact={this._updateContact.bind(this)}
                          addContact={this._addContact.bind(this)}
                          contactsList={this.state.contactsList}
                        />
                      </div>
                      <div id="content" className="col-xs-12 col-md-9 main">
                        <Content
                          selectedContact={this.state.selectedContact}
                          updateContact={this._updateContact.bind(this)}
                          removeContact={this._removeContact.bind(this)}
                          isEditing={this.state.isEditing}
                          toggleEditing={this._toggleEditing.bind(this)}
                        />
                      </div>
                    </div>
                  </div>
                );
              };

              _toggleEditing() {
                event.preventDefault();
                this.setState({
                  isEditing: !this.state.isEditing
                });
              }

              _generateUID() {
                  var d = new Date().getTime();
                  var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                      var r = (d + Math.random()*16)%16 | 0;
                      d = Math.floor(d/16);
                      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                  });
                  return uid;
              };

              _addContact(){
                const emptyContact = {
                  id: this._generateUID(),
                  name: '',
                  phone: '',
                  address:'',
                  notes: '',
                  Quote:''
                }
                this.state.contactsList.concat(emptyContact)
                this.setState({
                  selectedContact: emptyContact,
                  isEditing: true
                });
              }

              _updateContact(obj){
                var pos = this.state.contactsList.findIndex(x => x.id==obj.id) //find pos of item in array
                if (pos == -1) {pos = this.state.contactsList.length} //if it can't be found in the list then it must be a new entry
                this.state.contactsList.splice(pos,1,obj) // replace orignal
                this.state.contactsList.sort(function(a,b) {return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);} ); //sort list
                this.setState({
                  selectedContact: obj
                });
              }

              _removeContact(obj){
                var pos = this.state.contactsList.findIndex(x => x.id==obj.id) //find pos of item in array
                this.state.contactsList.splice(pos,1) // replace orignal
                this.state.contactsList.sort(function(a,b) {return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);} ); //sort list
                this.setState({
                  selectedContact: this.state.contactsList[0] //reset to 1st contact in list
                });
              }
            }

            class ContactNav extends React.Component { //child of AppContainer
              constructor() {
                super();
                this.state = {
                  filter: null
                }
              }

              render() {
                const contacts = this._getContacts() || [];
                return(
                  <div>
                    <div className="form-group form-group-lg add-button">
                      <button type="button" className="btn btn-default" onClick={this.props.addContact}>
                        Add Contact&nbsp;
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                      </button>
                    </div>
                    <div className="form-group form-group-lg filter">
                      <input id="contactsFilter" type="text" className="form-control" onChange={this._filterContacts.bind(this)} placeholder="Search for..." />
                    </div>
                    <ul className="nav nav-sidebar">
                      {contacts}
                    </ul>
                  </div>
                );
              }

              _handleClick(obj){
                event.preventDefault();
                this.props.updateSelectedContact(obj);
              }

              _filterContacts(event) {
                this.setState({
                  filter: event.target.value
                });
              }


              _getContacts() {
                let filter = this.state.filter;
                if (filter != null && filter.length > 0){
                  filter = filter.toUpperCase() //convert to upper case to match cases.
                  return this.props.contactsList
                    .filter(function(entry){
                      return entry.name.toUpperCase().indexOf(filter) != -1;  //test against filter
                    })
                    .map((i) => { // build new arry of results
                      return (
                        <li key={i.id}>
                            <a href="#" key={i.id} onClick={() => this._handleClick(i) }>
                            {i.name}
                          </a>
                        </li>
                      );
                    });
                } else {
                  return this.props.contactsList.map((i) => {
                    return (
                      <li key={i.id}>
                          <a href="#" key={i.id} onClick={() => this._handleClick(i) }>
                          {i.name}
                        </a>
                      </li>
                    );
                  });
                }
              }

            }

            class Content extends React.Component { //child of AppContainer
              constructor() {
                super();
                this.state = {
                  isEditing: false
                }
              }

              _handleClickRemove() {
                this.props.removeContact(this.props.selectedContact);
              }

              _handleSubmit(){
                event.preventDefault();
                this.setState({
                  //toggle editing mode to opposite previous
                  isEditing: !this.state.isEditing
                });
                //build array of updated values
                const updtedContact = {
                  id: this.props.selectedContact.id, //need to incriment for new contacts
                  name: document.getElementById("name").value,
                  phone: document.getElementById("phone").value,
                  address: document.getElementById("address").value,
                  notes: document.getElementById("notes").value,
                  Quote: ""
                };
                //update parent state
                this.props.updateContact(updtedContact);
              }

              render() {
                let contactInfo = "";
                let pageHeader = this.props.selectedContact.name !== "" ? this.props.selectedContact.name : "New Contact"; //set page title for new contacts
                let buttonText = this.props.selectedContact.name !== "" ? "Update" : "Add Contact";
                if(this.props.isEditing) {
                  contactInfo =
                      <div className="col-xs-10">
                        <form id="editContact" key={this.props.selectedContact.id}>
                          <h1 className="page-header">{pageHeader}</h1>
                          <div className="form-group form-group-lg">
                            <label for="name" className="col-form-label">Name:</label>
                            <input type="text" id="name" className="form-control" placeholder="Name" defaultValue={this.props.selectedContact.name} />
                          </div>
                          <div className="form-group form-group-lg">
                            <label for="phone" className="col-form-label">Phone Number:</label>
                            <input type="text" id="phone" className="form-control" placeholder="phone" defaultValue={this.props.selectedContact.phone} />
                          </div>
                          <div className="form-group form-group-lg">
                            <label for="address" className="col-form-label">Address:</label>
                            <button type="locate" className="btn btn-default">Here</button>
                            <textarea type="text" id="address" className="form-control" placeholder="address" rows="3" defaultValue={this.props.selectedContact.address} />
                          </div>
                          <div className="form-group form-group-lg">
                            <label for="notes" className="col-form-label">Notes:</label>
                            <textarea type="text" id="notes" className="form-control" placeholder="notes" rows="3" defaultValue={this.props.selectedContact.notes} />
                          </div>
                          <div className="form-group form-group-lg">
                            <button type="Update" className="btn btn-default" onClick={this._handleSubmit.bind(this)}>{buttonText}</button>
                          </div>
                        </form>
                      </div>;
                } else {
                  contactInfo =
                    <div className="col-xs-10">
                      <h1 className="page-header">{this.props.selectedContact.name}</h1>
                      <h3 className="sub-header">{this.props.selectedContact.phone}</h3>
                      <h6 className="sub-header">{this.props.selectedContact.address}</h6>
                      <h6 className="sub-header">{this.props.selectedContact.notes}</h6>
                    </div>;
                }

                return(
                  <div>
                    <div className="row">
                      {contactInfo}
                      <h1>
                        <div className="col-xs-2 btn-group" role="group">
                          <button type="button" className="btn btn-default" aria-label="Left Align" onClick={this.props.toggleEditing} >
                            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                          </button>
                          <button type="button" className="btn btn-default" aria-label="Left Align" onClick={this._handleClickRemove.bind(this)}>
                            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                          </button>
                        </div>
                      </h1>
                    </div>
                  </div>
                );
              }
            }


            ReactDOM.render(
              <AppContainer />, document.getElementById('app'), function(){console.timeEnd("app")}
            );
