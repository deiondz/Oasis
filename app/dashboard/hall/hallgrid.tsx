"use client";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";

function HallCard() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Hall 1</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Capacity: 100 people</p>
        <p className="text-sm text-muted-foreground">
          Amenities: AC, Projector, Sound System
        </p>
        <p className="text-sm text-muted-foreground">
          Primary In-Charge: John Doe
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Edit Hall
        </Button>
        <Button variant="destructive" size="sm" className="ml-2">
          Delete Hall
        </Button>
      </CardFooter>
    </Card>
  );
}

export function HallGrid() {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
      <HallCard />
      <HallCard />
      <HallCard />
    </div>
  );
}
