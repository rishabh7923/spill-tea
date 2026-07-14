import Layout from "@/components/Layout"
import CreateEditPostForm from "@/features/post/create-edit-post/CreateEditPostForm"

function Create() {
    return (
        <Layout>
            <div className="max-w-3xl">
                <CreateEditPostForm />
            </div>
        </Layout>
    )
}

export default Create