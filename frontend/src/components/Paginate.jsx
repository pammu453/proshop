import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false }) => {
    return (
        page >= 1 && (
            <Pagination style={{ display: "flex", justifyContent: "center", margin: "3px" }} >
                {[...Array(pages).keys()].map(x => (
                        <LinkContainer
                            key={x + 1}
                            to={!isAdmin ? `/page/${x + 1}` : `/admin/productlist/${x + 1}`}
                        >
                            <Pagination.Item active={x + 1 === page} >
                                <div style={{ color: "black"}} >
                                    {x + 1}
                                </div>
                            </Pagination.Item>
                        </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate
