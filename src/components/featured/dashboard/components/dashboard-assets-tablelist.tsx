"use client"
import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { deleteCraftById, getAllCraft } from '../services/craft.service'
import { CraftDisplay } from '../types/Craft'
import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'lucide-react'
import Link from 'next/link'
const DashboardAssetsTableList = () => {
    const [crafts, setCrafts] = useState<CraftDisplay[]>([])

    useEffect(() => {
        const fetchCrafts = async () => {
            try {
                const response = await getAllCraft();
                if (response) {
                    setCrafts(
                        response.map((craft) => ({
                            id: craft.id,
                            name: craft.name,
                            type: craft.type.join(", "),
                            owner: craft.owner,
                            email: craft.email,
                            phone: craft.phone,
                            maps: craft.maps,
                            images: craft.images,
                        }))
                    );
                }
            } catch (error) {
                console.log("No data displayed", error)
            }
        }
        fetchCrafts();
    }, [])

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this craft?");
        if (!confirmed) return;

        try {
            await deleteCraftById({ id });
            setCrafts((prev) => prev.filter((craft) => craft.id !== id));
        } catch (error) {
            console.error("Failed to delete craft:", error);
        }
    }


    return (
        <div className="overflow-hidden rounded-sm">
            <Table className='rounded-sm'>
                <TableHeader className='bg-gray-100'>
                    <TableRow>
                        <TableHead className="text-left">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {crafts.length > 0 ? (
                        crafts.map((craft) => (
                            <TableRow key={craft.id}>
                                <TableCell>{craft.id.slice(0, 8)}</TableCell>
                                <TableCell>{craft.name}</TableCell>
                                <TableCell>{craft.type}</TableCell>
                                <TableCell>{craft.phone}</TableCell>
                                <TableCell>{craft.owner}</TableCell>
                                <TableCell className='flex gap-2'>
                                    <Link href={`/dashboard/craft/edit/${craft.id}`}>
                                        <Button variant="outline" size="icon">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </Link>

                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(craft.id)}>
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-400">
                                No data available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DashboardAssetsTableList