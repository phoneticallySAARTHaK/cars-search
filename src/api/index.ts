export namespace api {
  export type CarDetails = {
    id: number;
    brand: string;
    model: string;
    launch_year: number;
    number_of_seats: number;
    fuel_type: string;
    mileage: string;
    drive: string;
    rent_per_month: number;
    currency: string;
    isFavorite: boolean;
  };

  export function fetchCars(q: string, page: string, isFavorite?: boolean) {
    void q, page, isFavorite;
    return null;
    return [
      {
        id: 1,
        brand: "Toyota",
        model: "Camry",
        launch_year: 2022,
        number_of_seats: 5,
        fuel_type: "Gasoline",
        mileage: "11.9 km/1-litre",
        drive: "Automatic",
        rent_per_month: 400,
        image_path: "path_to_toyota_camry_image.jpg",
        currency: "INR",
        isFavorite: false,
      },
      {
        id: 2,
        brand: "Honda",
        model: "Civic",
        launch_year: 2021,
        number_of_seats: 5,
        fuel_type: "Gasoline",
        mileage: "12.8 km/1-litre",
        drive: "Automatic",
        rent_per_month: 380,
        image_path: "path_to_honda_civic_image.jpg",
        currency: "INR",
        isFavorite: false,
      },
      {
        id: 3,
        brand: "Ford",
        model: "Mustang",
        launch_year: 2023,
        number_of_seats: 4,
        fuel_type: "Gasoline",
        mileage: "10.6 km/1-litre",
        drive: "Manual",
        rent_per_month: 500,
        image_path: "path_to_ford_mustang_image.jpg",
        currency: "INR",
        isFavorite: false,
      },
      {
        id: 4,
        brand: "Nissan",
        model: "Altima",
        launch_year: 2022,
        number_of_seats: 5,
        fuel_type: "Gasoline",
        mileage: "12.3 km/1-litre",
        drive: "Automatic",
        rent_per_month: 420,
        image_path: "path_to_nissan_altima_image.jpg",
        currency: "INR",
        isFavorite: false,
      },
      {
        id: 5,
        brand: "Chevrolet",
        model: "Tahoe",
        launch_year: 2021,
        number_of_seats: 8,
        fuel_type: "Gasoline",
        mileage: "7.6 km/1-litre",
        drive: "Automatic",
        rent_per_month: 600,
        image_path: "path_to_chevrolet_tahoe_image.jpg",
        currency: "INR",
        isFavorite: false,
      },
      {
        id: 6,
        brand: "BMW",
        model: "3 Series",
        launch_year: 2023,
        number_of_seats: 5,
        fuel_type: "Diesel",
        mileage: "13.6 km/1-litre",
        drive: "Automatic",
        rent_per_month: 550,
        image_path: "path_to_bmw_3_series_image.jpg",
        currency: "INR",
        isFavorite: false,
      },
    ];
  }

  export async function fetchPageCount(url: URL) {
    url;
    return 10;
  }

  let isFavorite = false;

  export async function toggleFavorite(id: string) {
    id;
    return (isFavorite = !isFavorite);
  }
}
