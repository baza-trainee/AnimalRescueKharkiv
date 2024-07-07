import initTranslations from '@/app/i18n';

export const NewArrivals = async ({ lng }) => {
    const { t } = await initTranslations(lng, ['new-arrivals']);
    return (
        <section className=''>
            <div>
                <p>New Arrivals</p>
            </div>
        </section>
    )
}