import { LIMIT_LISTS } from "@/constants/list.constants";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface DataTableProps {
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  onClearSearch: () => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonTopContentLabel?: string;
  onClickButtonTopContent?: () => void;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentPage: number;
  limit: string;
  totalPages: number;
  onChangePage: (page: number) => void;
  emptyContent: string;
  isLoading?: boolean;
}

const DataTable = (props: DataTableProps) => {
  const {
    columns,
    data,
    limit,
    currentPage,
    totalPages,
    onChangePage,
    renderCell,
    onChangeSearch,
    onClearSearch,
    buttonTopContentLabel,
    onClickButtonTopContent,
    onChangeLimit,
    emptyContent,
    isLoading,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[24%]"
          placeholder="Search by name"
          startContent={<CiSearch />}
          onClear={onClearSearch}
          onChange={onChangeSearch}
        />
        {buttonTopContentLabel && (
          <Button color="danger" onPress={onClickButtonTopContent}>
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [buttonTopContentLabel, onChangeSearch, onClickButtonTopContent]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        <Select
          className="hidden max-w-36 lg:block"
          size="md"
          selectedKeys={[limit]}
          selectionMode="single"
          onChange={onChangeLimit}
          startContent={<p className="text-small">Show: </p>}
          disallowEmptySelection
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={currentPage}
            total={totalPages}
            onChange={onChangePage}
            loop
          />
        )}
      </div>
    );
  }, [limit, totalPages, currentPage, onChangeLimit, onChangePage]);

  return (
    <Table
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
      topContent={TopContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        items={data}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/20 backdrop-blur-sm">
            <Spinner color="danger" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
