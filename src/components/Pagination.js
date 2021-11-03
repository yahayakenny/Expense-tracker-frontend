import React from 'react';

const Pagination = ({ dataPerPage, totalData, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;








// const Pagination = ({dataPerPage, totalData, paginate}) => {
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++){
//         pageNumbers.push(i)
//     }

//     return (
//         <nav className="pagination">
//             {pageNumbers.map(
//                 (number) => (
//                     <li key={number} className="page-item">
//                         <a onClick = {() => paginate(number)} href="!#" className="page-link">
//                             {number}
//                         </a>
//                     </li>
//                 )
//             )}
//         </nav>
//     )
// }

// export default Pagination;