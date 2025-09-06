import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function DataTable({
  columns,
  data,
  pageCount,
  filterColumnId,
  tableActionsButton,
  filterPlaceholder,
  onParamsChange
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '10';
  const filterValue = searchParams.get(filterColumnId) ?? '';

  const [localFilterValue, setLocalFilterValue] = useState(filterValue);

  const createQueryString = useCallback(
    (params) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === '') {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }
      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleUrlChange = useCallback(
    (params) => {
      const queryString = createQueryString(params);
      navigate(
        {
          pathname: location.pathname,
          search: `?${queryString}`
        },
        { replace: true }
      );
      onParamsChange?.(Object.fromEntries(new URLSearchParams(queryString)));
    },
    [createQueryString, location.pathname, navigate, onParamsChange]
  );

  const handleSearch = useCallback(() => {
    handleUrlChange({
      [filterColumnId]: localFilterValue || null,
      page: 1
    });
  }, [handleUrlChange, localFilterValue, filterColumnId]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualFiltering: true,
    state: {
      pagination: {
        pageIndex: Number(page) - 1,
        pageSize: Number(limit)
      },
      columnFilters: [
        {
          id: filterColumnId,
          value: filterValue
        }
      ]
    }
  });

  return (
    <div className="w-full max-w-full px-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-1">
          <Input
            placeholder={filterPlaceholder ?? 'Search...'}
            value={localFilterValue}
            onChange={(e) => setLocalFilterValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="w-full sm:max-w-sm"
          />
          <Button onClick={handleSearch} size="sm" className="w-full sm:w-auto text-white">
            <Search />
            Search
          </Button>
          {filterValue && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLocalFilterValue('');
                handleUrlChange({
                  [filterColumnId]: null,
                  page: 1
                });
              }}
              className="w-full sm:w-auto">
              Clear
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {tableActionsButton}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="text-muted-foreground text-left text-sm">
          Total {table.getFilteredRowModel().rows.length} row(s).
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 ml-auto">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
            <Select
              value={limit}
              onValueChange={(value) => {
                handleUrlChange({ limit: value, page: 1 });
              }}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={limit} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm font-medium whitespace-nowrap"></div>
          Page {table.getState().pagination.pageIndex + 1} of{''} {table.getPageCount()}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 sm:flex"
              onClick={() => handleUrlChange({ page: 1 })}
              disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handleUrlChange({ page: table.getState().pagination.pageIndex })}
              disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handleUrlChange({ page: table.getState().pagination.pageIndex + 2 })}
              disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 sm:flex"
              onClick={() => handleUrlChange({ page: table.getPageCount() })}
              disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
