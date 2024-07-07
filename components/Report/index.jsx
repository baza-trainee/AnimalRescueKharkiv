import initTranslations from '@/app/i18n';

export const Report = async ({ lng }) => {
    const { t } = await initTranslations(lng, ['report']);
    return (
        <section className=''>
            <div>
                <p>Report</p>
            </div>
        </section>
    )
}