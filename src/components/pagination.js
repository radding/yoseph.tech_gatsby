import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "gatsby";

export default (props) => {
  if (props.numOfPages <= 1) {
    return null;
  }
  return (
    <Row>
      <Col>
        <nav aria-label={`Pagination for pages with url ${props.slugBase}`}>
          <ul className="pagination justify-content-center">
            {
              props.currentPage !== 1 && (
                <>
                  <li className="page-item">
                    <Link to={props.slugBase} className="page-link">
                      <i className="fas fa-angle-double-left"></i>
                      <span className="sr-only">First</span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link to={props.currentPage === 2 ? props.slugBase : `${props.slugBase}/${props.currentPage - 1}`} className="page-link">
                      <i className="fas fa-angle-left"></i>
                      <span className="sr-only">Previous</span>
                    </Link>
                  </li>
                </>
              )
            }

            {
              Array.from({ length: props.numOfPages }).map((_, ndx) => {
                return (
                  <li className={`page-item ${ndx + 1 === props.currentPage ? "active" : ""}`} key={ndx} >
                    <Link
                      to={ndx === 0 ? props.slugBase : `${props.slugBase}/${ndx + 1}`}
                      className="page-link"
                    >
                      {ndx + 1}
                      <span className="sr-only">Previous</span>
                    </Link>
                  </li>
                )
              })
            }

            {
              props.currentPage !== props.numOfPages && (
                <>
                  <li className="page-item">
                    <Link to={`${props.slugBase}/${props.currentPage + 1}`} className="page-link">
                      <i className="fas fa-angle-right"></i>
                      <span className="sr-only">Next</span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link to={`${props.slugBase}/${props.numOfPages}`} className="page-link">
                      <i className="fas fa-angle-double-right"></i>
                      <span className="sr-only">Last</span>
                    </Link>
                  </li>
                </>
              )
            }
          </ul>
        </nav>
      </Col>
    </Row>
  )
}