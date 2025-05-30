import Table from "@/app/ui/customers/table";
import Search from '@/app/ui/search';
import Pagination from "@/app/ui/invoices/pagination";
import { Suspense } from "react";
import { lusitana } from "@/app/ui/fonts";
import { fetchAllCustomers, fetchCustomersPages } from "@/app/lib/data";


export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParam = await props.searchParams;
    const query = searchParam?.query || '';
    const currentPage = Number(searchParam?.page) || 1;
    const totalPages = await fetchCustomersPages(query);
    const customers = await fetchAllCustomers();
    return (

        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search customer" />
            </div>
            <Table customers={customers}>
            </Table>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )

}
