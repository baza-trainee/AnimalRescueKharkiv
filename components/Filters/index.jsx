import initTranslations from '@/app/i18n';

export const Filters = async ({ lng }) => {
    const { t } = await initTranslations(lng, ['filters']);
    return (
        <section className=''>
            <div>
                <p>Filters</p>
            </div>
        </section>
    )
}