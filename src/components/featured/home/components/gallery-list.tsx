// import React from 'react'
// import GalleryCard from './gallery-card'
// import Link from 'next/link'

// interface GalleryItem {
//     id: number
//     imgSrc: string
//     cardTitle: string
//     cardDescription: string
//     badgeType: string
// }

// interface GalleryListProps {
//     items: GalleryItem[]
// }

// const GalleryList = () => {
//     return (
//         <div className="flex flex-col gap-8 w-full p-10">
//             <p>Galeri</p>
//             <div className="flex flex-col md:flex-row ">
//                 <div className="w-[70%]">
//                     <h1 className='text-4xl w-3/5'>Kerajinan Lokal di Kelurahan Purbayan</h1>
//                 </div>
//                 <div className="w-[30%]">
//                     <p className='text-gray-500 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima reiciendis molestiae, earum deleniti inventore quod velit provident ipsa!</p>
//                 </div>
//             </div>
//             <div className="grid md:grid-cols-4 gap-6 w-full">
//                 {items.map((item) => (
//                     <Link key={item.id} href={`/craft/${item.id}`}>
//                         <GalleryCard
//                             imgSrc={item.imgSrc}
//                             cardTitle={item.cardTitle}
//                             cardDescription={item.cardDescription}
//                             badgeType={item.badgeType}
//                         />
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default GalleryList