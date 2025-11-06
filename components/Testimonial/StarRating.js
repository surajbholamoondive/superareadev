import { Star } from 'lucide-react'

const StarRating = ({ rating }) => {
  const normalizedRating = typeof rating === 'number' && rating >= 0 && rating <= 5 ? rating : 5

  const fullStars = Math.floor(normalizedRating)
  const hasHalfStar = normalizedRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <Star
          key={`full-${index}`}
          size={16}
          className="fill-[#FF7F22] text-[#FF7F22]"
        />
      ))}
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star
            key="half"
            size={16}
            className="text-[#FF7F22]"
            style={{ clipPath: 'inset(0 0 0 50%)' }} 
          />
          <Star
            key="half-bg"
            size={16}
            className="absolute top-0 left-0 fill-[#FF7F22] text-[#FF7F22]"
            style={{ clipPath: 'inset(0 50% 0 0)' }} 
          />
        </div>
      )}
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <Star
          key={`empty-${index}`}
          size={16}
          className="text-gray-300"
        />
      ))}
    </div>
  )
}


export default StarRating;