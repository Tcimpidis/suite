import { useWindowSize, WindowSize } from '@suite/hook';
import { FC, useState} from 'react';
import { FaXmark } from 'react-icons/fa6';
import Modal from 'react-modal';

import { ImageCarousel } from './ImageCarousel';
import { IconContext } from 'react-icons';

export interface ImageCarouselWrapperProps {
  imageUrlArray: string [];
  thumbnailCount: number;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    maxHeight: '100vh',
    maxWidth: '100vw',
    overflow: 'hidden'
  },
  overlay: {
    zIndex: 30,
  }
};

export const ImageCarouselWrapper: FC<ImageCarouselWrapperProps> = ({
  imageUrlArray,
  thumbnailCount,
}) => {
  const { width } = useWindowSize();
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] =useState<number | undefined>(0);

  const handleCloseImageModal = () => setIsImageModalOpen(!isImageModalOpen);

  const handleThumbnailSelected = (selectedIndex: number | undefined) => {
    setSelectedIndex(selectedIndex);
    setIsImageModalOpen(!isImageModalOpen);
  };

  const fullScreenThumbnailCount = () => {
    let thumbnailCount = 3
    if(width >= WindowSize.XL){
      thumbnailCount = 8;
    } else if(width >= WindowSize.LG) {
      thumbnailCount = 6
    } else if(width >= WindowSize.MD) {
      thumbnailCount = 4
    }
    return thumbnailCount;
  };

  return (
    <div>
      <ImageCarousel 
        imageUrlArray={imageUrlArray}
        isFullScreen={false}
        selectedIndex={selectedIndex}
        thumbnailCount={thumbnailCount}
        thumbnailSelected={handleThumbnailSelected}
        />
      <Modal 
        isOpen={isImageModalOpen}
        onRequestClose={handleCloseImageModal}
        style={customStyles}
        appElement={document.getElementById("root") as HTMLElement}
      >
        <div className='bg-black bg-opacity-80 flex flex-col min-h-screen min-w-screen max-w-screen px-12 py-16'>
          <div className='flex flex-row justify-end pb-4 px-9'>
            <button className='leading-none' onClick={handleCloseImageModal}>
              <IconContext.Provider value={{className:'text-white opacity-70 hover:opacity:100'}}>
                <FaXmark />
              </IconContext.Provider>
            </button>
          </div>
          <ImageCarousel 
            imageUrlArray={imageUrlArray}
            isFullScreen={true}
            selectedIndex={selectedIndex}
            thumbnailCount={fullScreenThumbnailCount()}
            thumbnailSelected={handleThumbnailSelected}
            />
        </div>
      </Modal>
    </div>
  )
}