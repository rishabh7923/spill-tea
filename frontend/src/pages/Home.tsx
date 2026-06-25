import PostFeed from '@/features/post/PostFeed';
import Layout from '@/components/Layout';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Row from '@/components/Row';


function Home() {
    return (<>
        <Layout>
            <Row className='border-b pb-2 md:pb-4'>
                <Select>
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Best" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="apple">Best</SelectItem>
                            <SelectItem value="banana">Hot</SelectItem>
                            <SelectItem value="blueberry">New</SelectItem>
                            <SelectItem value="grapes">Top</SelectItem>
                            <SelectItem value="pineapple">Rising</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>View</SelectLabel>
                            <SelectItem value="apple">Card</SelectItem>
                            <SelectItem value="banana">Compact</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Row>
            <PostFeed />
        </Layout >
    </ >
    )
}

export default Home
