"use client"
import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAllCraft } from '../services/craft.service'
import {  CraftDisplay } from '../types/Craft'
// import Image from 'next/image'
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
                            type: craft.type,
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

    return (
        <div className="overflow-hidden rounded-sm">
            <Table className='rounded-sm'>
                <TableHeader className='bg-gray-100'>
                    <TableRow>
                        <TableHead className="text-left">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="text-right">Owner</TableHead>
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