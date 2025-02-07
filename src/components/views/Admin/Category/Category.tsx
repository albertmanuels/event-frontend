import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./Category.hook";
import InputFile from "@/components/ui/InputFile";

const Category = () => {
  const router = useRouter();

  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    currentPage,
    currentLimit,
    handleChangeLimit,
    handleChangePage,
    setURL,
    handleSearch,
    handleClearSearch,
  } = useCategory();

  useEffect(() => {
    if (router.isReady) {
      setURL();
    }
  }, [router.isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category-button"
                  onPress={() => router.push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key="delete-category-button"
                  className="text-danger-500"
                >
                  Delete Category
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [router.push],
  );

  return (
    <section>
      {Object.keys(router.query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LIST_CATEGORY}
          data={dataCategory?.data || []}
          limit={String(currentLimit)}
          currentPage={Number(currentPage)}
          totalPages={dataCategory?.pagination?.totalPages}
          isLoading={isLoadingCategory || isRefetchingCategory}
          renderCell={renderCell}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={() => {}}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          emptyContent="Content is empty"
        />
      )}

      <InputFile name="input" isDropable />
    </section>
  );
};

export default Category;
