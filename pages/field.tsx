import { useFieldExtension, Wrapper } from "@graphcms/app-sdk-react";
import { Stack, TextArea, Button, Flex, Input } from "@hygraph/baukasten";

function FieldElement() {
    const { value, form, onChange } = useFieldExtension();

    function changevalue() {
        const formvalues = form.getState().then((values) => {
            console.log(values.values);
            let api = "/api/gpt/" + values.values.localization_en.name + "/" + values.values.localization_en.slug;
            api += "/" + values.values.localization_en.description;
            api += "/" + values.values.localization_en.price;

            fetch(api).then((res) => {
                const data = res.json();
                data.then((content) => {
                    console.log(content);
                    onChange(content);
                });
            });
        });
    }

    return (
        <Stack>
            <Button onClick={ () => changevalue() }>Generate Description</Button>
            <TextArea
                placeholder="Type something here"
                value={value || ""}
                onChange={(e: any) => onChange(e.target.value)}
            />
        </Stack>
    );
}

export default function Field() {
    return (
        <Wrapper>
            <FieldElement />
        </Wrapper>
    );
}
