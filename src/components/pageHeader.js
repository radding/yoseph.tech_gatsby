import React from "react";

export default (props) => {
  const size = props.size || 6;
  return (
    <div className="bg-light text-black">
      <div className="container-fluid py-5 py-lg-6 text-center">
        {props.image && (<img className="img-fluid" src={props.image} />)}
        <h1 className={`display-${size} pb-3`}>{props.title}</h1>
        <div className="row justify-content-center">
          {props.children}
          {/* <div className="col-lg-9">
            
            <div className="lead text-dark mb-0 small" dangerouslySetInnerHTML={{ __html: data.excerpt }}>
            </div>
          </div>
          <div className="col-lg-9">
            <p className="small text-muted">Filed under <Link className="p-2" to={`/${data.categories[0].slug}/`}>{data.categories[0].name}</Link></p>
          </div> */}
        </div>
      </div>
    </div>
  )
}