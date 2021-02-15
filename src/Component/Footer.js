import React from 'react'

function Footer() {
    return (
        <>

            <footer className="container py-5">
                    <div className="row">
                        <div className="col-12 col-md">
                            <small className="d-block mb-3 text-muted">© 2021-2022</small>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Blog</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="/Logout">Logout</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>linkedin</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="https://www.linkedin.com/in/sagar-pradhan-64763917a">Sagar Pradhan</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Git Profile</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="https://github.com/sagarpradhan4653">Sagar Pradhan</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Founder</h5>
                            <ul className="list-unstyled text-small">
                                <li><h4 className="text-muted">SAGAR PRADHAN</h4></li>

                            </ul>
                        </div>
                    </div>
                </footer>
        </>
    )
}

export default Footer
