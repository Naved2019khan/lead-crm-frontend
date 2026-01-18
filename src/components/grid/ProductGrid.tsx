"use client";
import React, { useState } from "react";
import { ProductDetailCard } from "../card/ProductDetailCard";
import AddProductCard from "../card/AddProductCard";
import { Modal } from "../ui/Modal";
import { NewProductSite } from "../form/NewProductSite";
import ThankYouModal from "../modal/ThankYouModal";
import { createAgencySites, createFlightSites, updateAgencySites, updateFlightSites } from "@/app/actions/product-api-action";
import { usePathname } from "next/navigation";

interface Site {
  id: string;
  name: string;
  location?: string;
  status?: "active" | "inactive";
}

interface ProductGridProps {
  sites: Site[];
  selectedSites?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  columns?: number;
  maxSelection?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  sites,
  columns = 3,
}) => {
  const gridCols =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    }[columns] || "grid-cols-3";
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(undefined);
  const [isSubmited, setIsSubmited] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isNewAgency = !editData;
  const pathname = usePathname()
  const isFlight = pathname.includes("all-flight-sites")

  const onClose = () => {
    setShowForm(false);
    setEditData(undefined);
  };

  const onEdit = (val) => {
    setShowForm(true);
    setEditData(val);
  };

  const handleNewProduct = async (val) => {
    try {
      isFlight ? await createFlightSites(val)   : await createAgencySites(val);
      setIsSubmited(true);
      setShowForm(false);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error?.message || "Something went wrong");
      console.log(error, "error");
    }
  };
  const handleEditProduct = async (val,oldSiteId) => {
    try {
      isFlight ? await updateFlightSites(val,oldSiteId)   : await updateAgencySites(val,oldSiteId);

      setIsSubmited(true);
      setShowForm(false);
    } catch (error) {
        setErrorMessage(error?.response?.data?.message || error?.message || "Something went wrong");
      console.log(error);
    }
  };

  const handleMessageClose = () => {
    setIsSubmited(false);
    setErrorMessage("");
  }

  return (
    <>
      <Modal isOpen={showForm} onClose={onClose}>
        <NewProductSite
          isEditing
          initialData={editData}
          onSubmit={isNewAgency ? handleNewProduct : handleEditProduct}
        />
      </Modal>

      <ThankYouModal
        isOpen={isSubmited || errorMessage}
        onClose={handleMessageClose}
        title={errorMessage ? "Error" : isNewAgency ? "Agency Created" : "Product Edited"}
        message={
          errorMessage ? errorMessage :
          isNewAgency
            ? "Agency Created Successfully"
            : "Product Edited Successfully"
        }
      />

      <div className="w-full space-y-4">
        <div className={`grid ${gridCols} gap-4`}>
          <AddProductCard
            title="Click to add agency"
            subtitle="new agency form"
            onClick={() => setShowForm(true)}
          />
          {sites?.map((site) => {
            return <ProductDetailCard key={site._id} onEdit={onEdit} site={site} />;
          })}
        </div>
      </div>
    </>
  );
};
