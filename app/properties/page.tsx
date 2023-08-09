import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import { getUserFavorites } from '@/app/actions/getUserFavorites';
import getListings from '../actions/getListings';
import PropertiesView from '../components/PropertiesView';

const PrprietiesPage = async () => {
  const currentUser = await getCurrentUser();


  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }


  const properties = await getListings({ userId: currentUser.id });
  const favorites = await getUserFavorites(currentUser.id);

  if (properties.length===0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="h-4" />
      <PropertiesView
        listings={properties}
        currentUser={currentUser}
        favorites={favorites}
      />
    </ClientOnly>
  );
};

export default PrprietiesPage;
