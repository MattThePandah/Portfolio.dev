'use client'

import { useState, useEffect } from 'react'
import Link from '@/components/Link'
import Image from 'next/image'

interface FloofApiResponse {
  image: string,
  link: string,
}

interface LizardApiResponse {
  url: string,
}

interface DogApiResponse {
  message: string,
  status: string,
}

//* This section is for the bunnies.io api call.
interface BunniesMedia {
  gif: string;
  poster: string;
}

interface BunniesApiResponse {
  thisServed: number;
  totalServed: number;
  id: string;
  media: BunniesMedia;
  source: string;
}

export default function NotFound() {
  const [imageUrl, setImageUrl] = useState<string>('')

  const apis = [
    // These APIs are currently causing me some problems
    // {
    //   url: 'https://cataas.com/cat',
    //   getImageUrl: (data: any) => data,
    // },
    // {
    //   url: 'http://shibe.online/api/shibes',
    //   getImageUrl: (data: any) => data.body[0],
    // },
    // {
    //   url: 'https://some-random-api.ml/img/koala',
    //   getImageUrl: (data: any) => data.link,
    // },
    // {
    //   url: 'https://some-random-api.ml/img/panda',
    //   getImageUrl: (data: any) => data.link,
    // },
    // {
    //   url: 'https://some-random-api.ml/img/birb',
    //   getImageUrl: (data: any) => data.link,
    // },
    // {
    //   url: 'https://random-d.uk/api/v1/random?type=png',
    //   getImageUrl: (data: any) => data.url,
    // },
    {
      url: 'https://dog.ceo/api/breeds/image/random',
      getImageUrl: (data: DogApiResponse) => data.message,
    },
    {
      url: 'https://api.bunnies.io/v2/loop/random/?media=gif,png',
      getImageUrl: (data: BunniesApiResponse) => data.media.gif,
    },
    {
      url: 'https://randomfox.ca/floof/',
      getImageUrl: (data: FloofApiResponse) => data.image,
    },
    {
      url: 'https://nekos.life/api/v2/img/lizard',
      getImageUrl: (data: LizardApiResponse) => data.url,
    },
  ]

  const fetchImageFromApi = async () => {
    const selectedApi = apis[Math.floor(Math.random() * apis.length)]
    try {
      const res = await fetch(selectedApi.url)
      const data = await res.json()
      console.log('API url: ', selectedApi.url)
      console.log('API response: ', data)
      return selectedApi.getImageUrl(data)
    } catch (error) {
      console.error('Error fetching data from API', error)
      return null
    }
  }

  const fetchApprovedImages = async () => {
    try {
      const res = await fetch('/api/approved-images')
      const images = await res.json()
      const randomIndex = Math.floor(Math.random() * images.length)
      return images[randomIndex]
    } catch (error) {
      console.error('Error fetching approved images', error)
      return null
    }
  }

  useEffect(() => {
    const fetchImageData = async () => {
      const useApi = Math.random() < 0.5

      if (useApi) {
        const imageUrl = await fetchImageFromApi()
        if (imageUrl) {
          console.log('Fetched image URL: ', imageUrl)
          setImageUrl(imageUrl)
        } else {
          const fallbackImageUrl = await fetchApprovedImages()
          if (fallbackImageUrl) {
            setImageUrl(fallbackImageUrl)
          }
        }
      } else {
        const fallbackImageUrl = await fetchApprovedImages()
        if (fallbackImageUrl) {
          setImageUrl(fallbackImageUrl)
        }
      }
    }

    fetchImageData()
  }, [])

  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <p className="mb-8">But here's a cute animal to cheer you up!</p>
        {imageUrl && (
          <Image src={imageUrl} alt="Random animal" width={500} height={500} priority={true} />
        )}
        <Link
          href="/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
