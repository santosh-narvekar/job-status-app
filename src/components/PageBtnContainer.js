
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../features/allJobs/allJobsSlice';
// prev-btn
// btn-container
// next-btn
const PageBtnContainer = () => {
  const {numOfPages,page}=useSelector((store)=>store.allJobs)
  const dispatch=useDispatch();

  const pages = Array.from({length:numOfPages},(_,index)=>{
    return index+1;
  })
  const prevBtn=()=>{
  let newPage = page - 1;
  if (newPage < numOfPages) {
    newPage = numOfPages;
  }
  dispatch(changePage(newPage));
  }
  const nextBtn=()=>{
    
  let newPage = page + 1;
  if (newPage > numOfPages) {
    newPage = 1;
  }
  dispatch(changePage(newPage));
  }

  return (
    <Wrapper>
      <button className='prev-btn'
      onClick={prevBtn}
      >
        <HiChevronDoubleLeft/>
        prev
      </button>
      <div className='btn-container'>
        {
          pages.map((pageNumber)=>{
            return <button
            type="button"
            className={pageNumber===page?'pageBtn active':'pageBtn'}
            key={pageNumber}
            onClick={()=>dispatch(changePage(pageNumber))}
            >
              {pageNumber}
              </button>
          })
        }
      </div>
      <button
      className='next-btn'
      onClick={nextBtn}
      >
        <HiChevronDoubleRight/>
        next
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
