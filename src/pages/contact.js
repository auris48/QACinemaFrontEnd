export function contact(){
    return <div>
    
    <h1 className="contactPageHeading">Contact Us!</h1>
    <div className="contactPage">
        <div className="contactUsParagraph">
            <h1>Contact Us</h1>
        <div className="contactText">
        <div className="contactLeft">
        <div className="textBlock">
        <br />
        <p><strong>Contact Information</strong></p>
        <p>Have any questions, queries, or complaints? Feel free to contact us through the methods below, and we'll get back to you shortly!</p> <br />
        </div>
        <div className="textBlock">
        <p><strong>Email</strong></p>
        <br />
        <p>example@example.com</p> <br />
        </div>
        <div className="textBlock">
        <p><strong>Phone Number</strong></p>
        <br />
        <p>0345 074 7829</p> <br />
        </div>
        <div className="textBlock">
        <p><strong>Mailing Address</strong></p>
        <br />
        <p>3rd Floor, International House<br></br> 1 St Katherine's Way, London<br></br> E1W 1UN</p> <br />
        </div>
        </div>

        <div className="contactRight">
        <div className="textBlock">
        <p><strong>Email form</strong></p>
        <br />
        <p>If you want to get in touch via Email, feel free to send us a message via this form below and we'll get back to you as soon as possible</p> <br />
        </div>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
        </div>


        </div>


    </div>
    </div>
    
}