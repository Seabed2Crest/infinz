import React from "react";

interface CategoryBadgeProps {
    category: string;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
    if (!category) return null;

    const categories = category.split(',').map((cat) => cat.trim()).filter(Boolean);

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((cat, index) => (
                <span
                    key={index}
                    className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                >
                    {cat}
                </span>
            ))}
        </div>
    );
}
