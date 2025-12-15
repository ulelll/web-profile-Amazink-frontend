import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewsCard({ image, title, description, onRead, synopsis }) {
  return (
    <Card className="w-full max-w-sm">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {synopsis}
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={onRead}>Baca Selengkapnya</Button>
      </CardFooter>
    </Card>
  )
}
