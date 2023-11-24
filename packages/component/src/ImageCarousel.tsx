import { FC, useCallback, useEffect, useState } from 'react';
import { IconContext } from "react-icons";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import noImage from '../assets/no-image.svg';

const FullScreenSelectedThumbnail: FC<{url: string}> = ({
  url
}) => (
  <div className='w-screen rounded-xl overflow-hidden flex flex-col items-center'>
    <img 
      alt="fullscreen-thumbnail"
      className='object-scale-down h-[35rem] w-fit rounded-xl'
      data-test-id="fullscreen-selected-thumbnail"
      src={url}
    />
  </div>
)

interface SelectedThumbnailProps {
  url: string;
  thumbnailSelected: (selectedIndex: number | undefined) => void;
  thumbnailIndex: number;
}

const SelectedThumbnail: FC<SelectedThumbnailProps> = ({
  url,
  thumbnailSelected,
  thumbnailIndex
}) => {
  const handleThumbnailSelected = useCallback(() => {
      thumbnailSelected(thumbnailIndex)
  },[thumbnailSelected,thumbnailIndex]);

  return ( 
    <div className='flex justify-center'>
      <button 
        data-testid="selected-thumbnail-btn"
        onClick={handleThumbnailSelected}>
        <div className='max-w-full w-[30vw] h-[25vh] rounded-xl overflow-hidden border'>
          <img 
            alt="fullscreen-thumbnail"
            className='object-scale-down w-full h-full'
            data-test-id="selected-thumbnail"
            src={url}
          />
        </div>
      </button>
    </div>
  )
}

interface CarouselProps {
  viewableThumbnailIndeses?: number[];
  thumbnailIndex?: number;
  handlePrevSlide: () => void;
  selectedThumbnaiul?: JSX.Element;
  imageUrlArray: string[];
  handleNextSlide: () => void;
  setThumbnailIndex: (selectedIndex: number) => void;
  isFullScreen:boolean
}

const Carousel: FC<CarouselProps> = ({
  viewableThumbnailIndeses,
  thumbnailIndex,
  selectedThumbnaiul,
  imageUrlArray,
  handleNextSlide,
  handlePrevSlide,
  setThumbnailIndex,
  isFullScreen
}) => {
  const handleThumbnailSelected = useCallback(
    (thumbnailIndex: number) => () => {
      setThumbnailIndex(thumbnailIndex)
  },[setThumbnailIndex]);

  const chevronButtonClassName = isFullScreen ? 'bg-white bg-opacity-20 h-10 w-[34px] flex flex-row justify-center items-center' : ""
  const chevronBackButtonClassName = `${
    thumbnailIndex === 0 ? '' : 'group hover:bg-opacity-10'
  } `
  const chevronForwardButtonClassName = `${
    thumbnailIndex === imageUrlArray.length -1 ? '' : 'group hover:bg-opacity-10'
  } `
  const chevronClassName = isFullScreen ? "font-bold text-white" : "font-thin h-7";
  
  return (
    <div className='flex flex-col'>
      <div 
        className='max-w-full flex fex-row justify-center items-center pb-3 gap-4'
        data-testid='image-carousel'
        >
          {viewableThumbnailIndeses && viewableThumbnailIndeses?.length > 1 && (
            <button
              className={`${chevronButtonClassName} ${chevronBackButtonClassName}`}
              data-testid='fullscreen-back-chevron'
              disabled={thumbnailIndex === 0}
              onClick={handlePrevSlide}
            >
              <IconContext.Provider value={{className:`${
                thumbnailIndex === 0 
                  ? 'opacity-40 cursor-not-allowed'
                  : 'group-hover:opacity-100'
                } ${chevronClassName} opacity-60`}}>
                <FaChevronLeft />
              </IconContext.Provider>
            </button>
          )}
          {selectedThumbnaiul}
          {viewableThumbnailIndeses && viewableThumbnailIndeses?.length > 1 && (
            <button
              className={`${chevronButtonClassName} ${chevronForwardButtonClassName}`}
              data-testid='fullscreen-forward-chevron'
              disabled={thumbnailIndex === imageUrlArray.length - 1}
              onClick={handleNextSlide}
            >
              <IconContext.Provider value={{className:`${
                thumbnailIndex === imageUrlArray.length - 1 
                  ? 'opacity-40 cursor-not-allowed'
                  : 'group-hover:opacity-100'
                } ${chevronClassName} opacity-60`}}>
                <FaChevronRight />
              </IconContext.Provider>
            </button>
          )}
      </div>
      <div className='flex flex-row w-full gap-x-2 justify-center items-center'>
        {viewableThumbnailIndeses && 
          viewableThumbnailIndeses.map(index => {
            const viewableIndexOfThumbnail =
              viewableThumbnailIndeses.indexOf(index);
            const imagesLeft = imageUrlArray.length - 1 - index;
            const url = imageUrlArray.find((_, i) => i === index);
            
            return (
              <div className='relative rounded-xl' key={index}>
                <img 
                  alt="fullscreen-thumbnail"
                  className={`${
                    thumbnailIndex === index 
                      ? 'border border-blue-400'
                      : 'opacity-60'
                  } w-[5.5rem] h-16 rounded-xl`}
                  data-testid="fullscreen-thumbnail"
                  onClick={handleThumbnailSelected(index)}
                  onKeyDown={handleThumbnailSelected(index)}
                  role='presentation'
                  src={url}
                  tabIndex={index}
                />
                {viewableIndexOfThumbnail === viewableThumbnailIndeses.length - 1 && 
                imagesLeft !== 0 && (
                  <button 
                    className='flex flex-col justify-center items-center rounded-xl bg-blue-400 bg-opacity-50 absolute top-0 right-0 h-full w-full'
                    onClick={handleThumbnailSelected(index)}
                    >
                    <span className='text-xs font-bold text-white'>{imagesLeft} Images</span>
                  </button>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

interface ImageCarouselProps {
  imageUrlArray: string[];
  thumbnailCount: number;
  isFullScreen: boolean;
  thumbnailSelected: (selectedIndex: number | undefined) => void;
  selectedIndex?: number; 
}

export const ImageCarousel: FC<ImageCarouselProps> = ({
  imageUrlArray,
  thumbnailCount,
  isFullScreen,
  thumbnailSelected,
  selectedIndex = 0
}) => {
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(selectedIndex);
  const [selectedThumbnail, setSelectedThumbnail] = useState<JSX.Element>();
  const [previousThumbnailCount, setPreviousThumbnailCount] = useState<number>(0)
  const [viewableThumbnailIndexes, setViewableThumbnailIndexes] = useState<number[]>();

  useEffect(() => {
    if(imageUrlArray && imageUrlArray.length > 0) {
      const viewableIndexes: number[] = [];
      if(!viewableThumbnailIndexes && selectedIndex === 0) {
        imageUrlArray.forEach((_,i) => {
          if(i < thumbnailCount) {
            viewableIndexes.push(i);
          }
        })
        setViewableThumbnailIndexes(viewableIndexes);
        setPreviousThumbnailCount(thumbnailCount);
      } else if (previousThumbnailCount !== thumbnailCount) {
        const indexOffsetDifference = imageUrlArray.length - 1 - thumbnailIndex;
        if(indexOffsetDifference >= thumbnailCount){
          if(thumbnailCount > imageUrlArray.length) {
            for (let x = 0; x < imageUrlArray.length; x++) {
              viewableIndexes.push(thumbnailIndex + x)
            }
          } else {
            for (let x = 0; x < thumbnailCount; x++) {
              viewableIndexes.push(thumbnailIndex + x)
            }
          }
        } else {
          const newIndexOfCurrentVisibleIndex =
            thumbnailIndex + indexOffsetDifference;
          if(thumbnailCount > imageUrlArray.length) {
            for (let x = 0; x < imageUrlArray.length; x++) {
              viewableIndexes.unshift(newIndexOfCurrentVisibleIndex - x)
            }
          } else {
            for (let x = 0; x < thumbnailCount; x++) {
              viewableIndexes.unshift(newIndexOfCurrentVisibleIndex - x)
            }
          } 
        }
        setViewableThumbnailIndexes(viewableIndexes);
        setPreviousThumbnailCount(thumbnailCount);
      } 
    } else if (viewableThumbnailIndexes) {
      setViewableThumbnailIndexes(undefined);
      setPreviousThumbnailCount(0);
    }
  },[
    imageUrlArray,
    thumbnailCount,
    thumbnailIndex,
    previousThumbnailCount,
    viewableThumbnailIndexes
  ]);

  useEffect(() => {
    const selectedUrl = 
      imageUrlArray.find((_,i) => i === thumbnailIndex) || noImage;
    if(selectedUrl) {
      if(isFullScreen) {
        setSelectedThumbnail(<FullScreenSelectedThumbnail url={selectedUrl} />)
      } else {
        setSelectedThumbnail(
          <SelectedThumbnail
            thumbnailIndex={thumbnailIndex}
            thumbnailSelected={thumbnailSelected}
            url={selectedUrl} />)
      }
    }
  },[imageUrlArray, thumbnailIndex, thumbnailSelected]);

  const addToBeginningOfViewableIndexArray = useCallback(
    (index:number) => {
      if(viewableThumbnailIndexes) {
        const viewableIndexOfThumbnail = viewableThumbnailIndexes.indexOf(index);
        if(
          (viewableIndexOfThumbnail === 0 && index !== 0) || 
          viewableIndexOfThumbnail === -1
        ) {
          const newVisableArray: number[] = [];
          if(index < thumbnailCount -1 ) {
            const indexOffsetDifference = thumbnailCount - 1 - index;
            const newIndexOfCurrentVisibleThumbnails = index + indexOffsetDifference;
            for(let x = 0; x < thumbnailCount; x++) {
              newVisableArray.unshift(newIndexOfCurrentVisibleThumbnails - x);
            }
          } else {
            for(let x = 0; x < thumbnailCount; x++) {
              newVisableArray.unshift(index - x);
            }
          }
          setViewableThumbnailIndexes(newVisableArray);
        }
      }
    },
    [thumbnailCount, viewableThumbnailIndexes, setViewableThumbnailIndexes]
  )

  const addToEndOfViewableIndexArray = useCallback(
    (index:number) => {
      if(viewableThumbnailIndexes) {
        const viewableIndexOfThumbnail = viewableThumbnailIndexes.indexOf(index);
        if(
          (viewableIndexOfThumbnail === thumbnailCount -1 || 
          viewableIndexOfThumbnail === -1) && 
          index <= imageUrlArray.length -1
        ) {
          const newVisableArray: number[] = [];
          if(index + thumbnailCount - 2 < imageUrlArray.length -1 ) {
            for(let x = 0; x < thumbnailCount; x++) {
              newVisableArray.push(index + x);
            }
          } else {
            const indexOffset = imageUrlArray.length - 1 - index
            const indexOffsetDifference = thumbnailCount - 1 - indexOffset;
            const beginningIndexOfCurrentVisibleThumbnails = index - indexOffsetDifference;
            for(let x = 0; x < thumbnailCount; x++) {
              newVisableArray.push(beginningIndexOfCurrentVisibleThumbnails + x);
            }
          }
          setViewableThumbnailIndexes(newVisableArray);
        }
      }
    },
    [imageUrlArray, thumbnailCount, viewableThumbnailIndexes, setViewableThumbnailIndexes]
  )

  const handlePrevSide = useCallback(() => {
    if(thumbnailIndex === 0) {
      setThumbnailIndex(imageUrlArray.length - 1);
      addToBeginningOfViewableIndexArray(imageUrlArray.length)
    } else {
      setThumbnailIndex(thumbnailIndex - 1);
      addToBeginningOfViewableIndexArray(thumbnailIndex -1)
    }
  },[imageUrlArray, thumbnailIndex, setThumbnailIndex, addToBeginningOfViewableIndexArray]);

  const handleNextSide = useCallback(() => {
    if(thumbnailIndex < imageUrlArray.length -1) {
      setThumbnailIndex(thumbnailIndex + 1);
      addToEndOfViewableIndexArray(thumbnailIndex + 1)
    } else {
      setThumbnailIndex(0);
      addToEndOfViewableIndexArray(0)
    }
  },[imageUrlArray, thumbnailIndex, setThumbnailIndex, addToEndOfViewableIndexArray]);

  return (
    <Carousel 
      handleNextSlide={handleNextSide}
      handlePrevSlide={handlePrevSide}
      imageUrlArray={imageUrlArray}
      selectedThumbnaiul={selectedThumbnail}
      setThumbnailIndex={setThumbnailIndex}
      thumbnailIndex={thumbnailIndex}
      viewableThumbnailIndeses={viewableThumbnailIndexes}
      isFullScreen={isFullScreen}
      />
  )
}
