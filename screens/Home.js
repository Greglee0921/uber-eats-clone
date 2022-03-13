import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import Categories from '../components/Categories';
import HeaderTabs from '../components/HeaderTabs';
import Searchbar from '../components/Searchbar';
import RestaurantItem, { localRestaurants } from '../components/RestaurantItem';

const YELP_API_KEY =
  "F-uO1St_TiBsm7nualQZY3GdI4ELkSXIujbx1kxmOesNy0XfNvvozj-hobxPEgFwwhcCk0zDxOZGOilsS5GMxc1AFZsnJ5AhLtGjrScRKPv9E52yntDePNZcJlkuYnYx";

export default function Home() {
  const [restaurantData, setRestaurantData] = React.useState(localRestaurants);
  const [city, setCity] = useState("New York");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  }

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
      <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Searchbar cityHandler={setCity}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Categories />
      <RestaurantItem
      restaurantData={restaurantData}/>
      </ScrollView>
    </SafeAreaView>
  );
}
