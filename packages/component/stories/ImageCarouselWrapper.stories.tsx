import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ImageCarouselWrapper, ImageCarouselWrapperProps } from '../src/ImageCarouselWrapper';

const storyDescription = `
  Provides a responsvie carourel of images. Supports viewing image carousel in full screen mode.

  While the widget itself is responsible for displaying the imagegs. Retriveing the images and 
  getting their urls into an array is the job of the consumer. The consumer can also dictate 
  how many thumbnails are viewable within the component (Not the full screen experience).
`

export default {
  title: 'ImageCarourselWrappere',
  component: ImageCarouselWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: storyDescription,
      },
    },
  },
} as Meta<typeof ImageCarouselWrapper>;

const Template: StoryFn<typeof ImageCarouselWrapper> = ({
  imageUrlArray,
  thumbnailCount,
}: ImageCarouselWrapperProps) => (
  <div className='flex flex-col items-center justify-center h-[80vh] w-full'>
    <ImageCarouselWrapper 
      imageUrlArray={imageUrlArray}
      thumbnailCount={thumbnailCount}
    />
  </div>
)

export const imageCarouselWrapper = Template.bind({});
(imageCarouselWrapper.args as ImageCarouselWrapperProps) = {
  imageUrlArray: [
    'https://64.media.tumblr.com/51ce939c3b7570134515eea1c7eb59ff/tumblr_n2pgeb86ro1tw7pebo1_400.jpg',
    'https://64.media.tumblr.com/70a02d19004d24cbcf89fed01febcdec/tumblr_n3tpzu6aSe1qakqfvo1_500.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHnbJz-vspEYAckgwRecaWXwnLz1dwz32rYND0STmOXdKMOyF_sc9xMX4xKkP4G6C7K0&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG43ZQVhjCXg_kpfxNZq4hpFSyL6l1C0sbSufOC8lEsVo7inFqwi4O_FLTbEBN3-tcw9U&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzrr04T5Qlo1LXZl9ylxPDaDZKyP1JKC8ijRwtHqF5PANVX-nXeCUCfo15u_Yu57HcIiw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMxYNH2E8cLboiB5N1Ybe0uZRcIOkCwP_1emjEQ_yzfWnw2Y-tgrplyyuOb-eOEHnsx0I&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV9TgLHmYbkhbyDla6oKmFcSUUByoio1XtW-ZOpzPO0PFyK7X8aTxEzzbYqWBdHZLVPg8&usqp=CAU',
  ],
  thumbnailCount: 4
}