import { ExpandableCard } from "@/components/ui/expandable-card";
import { Button } from "@/components/ui/button"
import { Badge } from "./ui/badge"



function MovieCard({movie}) {
  return (
  <ExpandableCard
    title="Whispering Forest"
    src="/images/components/expandable-card/haunted-house.webp"
    description="A Yokai Tale"
  >
    deneme
  </ExpandableCard>
  )
}

export default MovieCard