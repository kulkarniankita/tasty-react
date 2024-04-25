import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";
import { RecipeType } from "@/types";

function HomePage() {
  const [data, setData] = useState<Array<RecipeType>>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Array<RecipeType>>([]);
  const [badge, setBadge] = useState("");

  const recipes = filteredRecipes.length > 0 ? filteredRecipes : data;

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(`https://dummyjson.com/recipes`);
      const { recipes } = await response.json();

      setData(recipes);
    };

    getRecipes();
  }, []);

  const handleOnBadgeClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cuisine: string
  ) => {
    e.preventDefault();
    setBadge(cuisine);
  };

  useEffect(() => {
    if (badge) {
      const filteredRecipes = data.filter(
        (recipe: RecipeType) => recipe && recipe.cuisine === badge
      );
      setFilteredRecipes(filteredRecipes);
    }
  }, [badge, data]);

  return (
    <div className="xl:px-24 px-10">
      <div className="my-12">
        {[
          "All",
          "Asian",
          "American",
          "Greek",
          "Italian",
          "Indian",
          "Japanese",
          "Mediterranean",
          "Mexican",
          "Pakistani",
        ].map((cuisine, idx) => (
          <Badge
            key={`${cuisine}-${idx}`}
            variant="outline"
            className="border-orange-800 text-gray-900 text-lg mx-2 my-1 hover:cursor-pointer bg-orange-50 hover:scale-110 ease-in duration-200"
            onClick={(e) => handleOnBadgeClick(e, cuisine)}
          >
            <p>{cuisine}</p>
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-x-10 gap-y-20 xl:gap-y-32 xl:pt-32 pt-12 pb-40">
        {recipes.map((item: RecipeType) => (
          <a href={`/recipes/${item.id}`} key={item.id}>
            <Card className="flex flex-col bg-orange-50 hover:scale-105 ease-in duration-200 xl:min-h-[600px] fancyGradient">
              <CardHeader>
                <img
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="bg-cover rounded-md shadow-xl"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="uppercase lg:text-3xl relative font-bold line-clamp-2">
                  {item.name}
                </CardTitle>
              </CardContent>
              <CardFooter className="flex items-start gap-2 lg:gap-12 lg:flex-row flex-col">
                <div className="flex flex-col">
                  <p className="text-lg">Serves</p>
                  <p className="text-gray-800">{item.servings}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg">Prep Time</p>
                  <p className="text-gray-800">{item.prepTimeMinutes} MIN</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg">Cook Time</p>
                  <p className="text-gray-800">{item.cookTimeMinutes} MIN</p>
                </div>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
