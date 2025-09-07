"use server"

import { generateSlug } from "@/lib/utils";
import prisma from "../../../../../lib/prisma";
import { Craft, CraftWithoutSlug } from "../types/Craft";
const prismaDb = prisma;

export async function createCraft(params: Craft) {
    try {
        const slug = generateSlug(params.name);
        const data = await prismaDb.craft.create({
            data: {
                name: params.name,
                type: params.type, 
                owner: params.owner,
                email: params.email,
                phone: params.phone,
                maps: params.maps,
                images: params.images,
                description: params.description,
                slug: slug,
            },
        });
        return data;
    } catch (error) {
        console.error("Database Error:", error);
        return;
    }
}

export async function getCraftById(id: string) {
    const data = await prismaDb.craft.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            type: true,
            description: true,
            images: true,
            slug: true,
            email: true,
            phone: true,
            maps: true,
            owner: true,
        }
    });
    return data;
    
}

export async function updateCraft(id: string, params: CraftWithoutSlug) {
    try {
        const data = await prismaDb.craft.update({
            where: {
                id: id,
            },
            data: {
                name: params.name,
                type: params.type,
                owner: params.owner,
                email: params.email,
                phone: params.phone,
                maps: params.maps,
                images: params.images,
                description: params.description,
            },
        });
        return data;
    } catch (error) {
        console.error(" Error:", error);
        return;
    }
}

export async function deleteCraftById(params: { id: string }) {
    try {
        const data = await prismaDb.craft.delete({
            where: {
                id: params.id,
            },
        });
        return data;
    } catch (error) {
        console.error("Database Error:", error);
        return;
    }
}

export async function countCraft() {
    try {
        const count = await prismaDb.craft.count();
        return count;
    } catch (error) {
        console.error("Database Error:", error);
        return;
    }
}

export async function getAllCraftGallery() {
    try {
        const data = await prismaDb.craft.findMany({
            select: {
                id: true,
                name: true,
                type: true,
                description: true,
                images: true,
                slug: true,
            }
        });
        return data;
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}

export async function getCraftBySlug(slug: string) {
    const data = await prismaDb.craft.findUnique({
        where: {
            slug: slug,
        },
        select: {
            id: true,
            name: true,
            type: true,
            description: true,
            images: true,
            slug: true,
            email: true,
            phone: true,
            maps: true,
            owner: true,
        }
    });
    return data;
}

export async function getCraftByCategory(type: string) {
    const data = await prisma.craft.findMany({
        where: {
            type: {
                has: type
            }
        },
        select: {
            id: true,
            name: true,
            type: true,
            owner: true,
            email: true,
            phone: true,
            maps: true,
            images: true,
            slug: true,
            description: true
        }
    });
    return data;
}

export async function getAllCraft() {
    const data = await prismaDb.craft.findMany({
        select: {
            id: true,
            name: true,
            type: true,
            owner: true,
            email: true,
            phone: true,
            maps: true,
            images: true,
        }
    });
    return data;
}