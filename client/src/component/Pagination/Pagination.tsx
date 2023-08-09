import { useCallback } from "react";

import './Pagination.scss';

interface PaginationProps {
    pages: number,
    currPage: number,
    setCurrPage: (page: number) => void,
}
export const Pagination = ({pages, currPage, setCurrPage}: PaginationProps) => {

    const countPages = useCallback((pages: number) => {
        const listOfPages = [];
        for(let i = 1; i <= pages; i++) {
            listOfPages.push(i);
        }

        return listOfPages;
    }, []);

    return  (
        <div className="pagination">
            <ul className="pagination__container">
               {countPages(pages).map((page: number) => <li className="pagination__page" onClick={() => setCurrPage(page)}>{page}</li>)}
            </ul>
        </div>
    )
}