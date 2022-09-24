import { FC, useEffect, useMemo, useState } from 'react';
import * as Styled from './Style';

type Page = {
  page: number;
  active: boolean;
};

type PagenationType = {
  index: number;
  startPage: number;
  endPage: number;
  page: Array<Page | undefined>;
};

interface PagenationProps {
  page: number;
  totalPage: number;
  limit: number;
  setPage?: (page: number) => void;
}

const Pagenation: FC<PagenationProps> = ({ page, totalPage, limit, setPage }) => {
  // page State
  const [pageList, setPageList] = useState<PagenationType[]>([]);
  const LIMIT_PAGE: number = limit;
  const totalIndex = useMemo(() => Math.ceil(totalPage / LIMIT_PAGE), [totalPage]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // page qurey setIndex
  useEffect(() => {
    if (!page) return;
    if (page % LIMIT_PAGE === 0) {
      setCurrentIndex(page / LIMIT_PAGE - 1);
    } else {
      setCurrentIndex(Math.floor(page / LIMIT_PAGE));
    }
  }, []);

  // page List
  useEffect(() => {
    setPageList([]);
    for (let i = 0; i < totalIndex; i++) {
      setPageList((prev) => [
        ...prev,
        {
          index: i,
          startPage: i * LIMIT_PAGE + 1,
          endPage: i * LIMIT_PAGE + LIMIT_PAGE,
          page: Array(LIMIT_PAGE)
            .fill(LIMIT_PAGE)
            .map((_, index) => {
              if (i * LIMIT_PAGE + index + 1 > totalPage) {
                return;
              }
              return { page: i * LIMIT_PAGE + index + 1, active: false };
            }),
        },
      ]);
    }
  }, [totalIndex, LIMIT_PAGE]);

  // page active
  useEffect(() => {
    if (!pageList[currentIndex]) return;
    const newPageList = [...pageList];
    newPageList[currentIndex]?.page.forEach((item) => {
      if (item) {
        item.active = item.page === page;
      }
    });
    setPageList(newPageList);
  }, [page]);

  // page click
  const onClickPage = (page: number) => {
    if (setPage) {
      setPage(page);
    }
  };

  // onClickPrev
  const onClickPrev = () => {
    if (currentIndex === 0) return;
    if (!setPage) return;
    setPage((currentIndex - 1) * LIMIT_PAGE + 1);
    setCurrentIndex(currentIndex - 1);
  };

  // onCLickNextPage
  const onClickNext = () => {
    if (currentIndex === totalIndex - 1) return;
    if (!setPage) return;

    setPage((currentIndex + 1) * LIMIT_PAGE + 1);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <Styled.Wrapper>
      <button
        onClick={() => {
          setPage && setPage(1);
          setCurrentIndex(0);
        }}
      >
        start
      </button>
      <button disabled={currentIndex === 0} onClick={onClickPrev}>
        prev
      </button>
      {pageList.length > 0 &&
        pageList[currentIndex].page.map((list) => {
          if (list)
            return (
              <Styled.Page
                active={page === list.page}
                key={list?.page}
                onClick={() => onClickPage(list.page)}
              >
                {list.page}
              </Styled.Page>
            );
        })}
      <button disabled={currentIndex === totalIndex - 1} onClick={onClickNext}>
        next
      </button>
      <button
        onClick={() => {
          setPage && setPage(totalPage);
          setCurrentIndex(totalIndex - 1);
        }}
      >
        last
      </button>
    </Styled.Wrapper>
  );
};
export default Pagenation;
