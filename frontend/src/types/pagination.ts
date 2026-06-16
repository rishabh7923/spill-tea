export type Pagination = {
    total_pages: number;
    current_page: number;
    next_page: number | null;
    prev_page: number | null;
};