import initTranslations from '@/app/i18n';

export const AnimalCounter = async ({ lng }) => {
    const { t } = await initTranslations(lng, ['animal-counter']);
    return (
        <section className=''>
            <div>
                <p>Animal Counter</p>
            </div>
        </section>
    )
}