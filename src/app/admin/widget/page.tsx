"use client";

import { GET_WIDGETS } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";
import React from "react";

const WidgetAdminPage = () => {
  const { data, loading, error } = useQuery(GET_WIDGETS);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1>Widget Admin</h1>
      {data?.widgets.map((widget) => <div key={widget.id}>{widget.name}</div>)}
    </div>
  );
};

export default WidgetAdminPage;
