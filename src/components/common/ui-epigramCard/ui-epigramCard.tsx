import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './ui-epigramCard.module.scss';

const cx = classNames.bind(styles);

interface EpigramCardProps {
  id: number;
  content: string;
  author: string;
  tags: {
    name: string;
    id: number;
  }[];
}

const EpigramCard: React.FC<EpigramCardProps> = ({ id, content, author, tags }) => (
  <section>
    <Link className={cx('card-link')} href={`epigrams/${id}`}>
      <div className={cx('card')}>
        <h3 className={cx('content')}>{content}</h3>
        <h4 className={cx('author')}>-{author}-</h4>
      </div>
      <ul className={cx('tags')}>
        {tags.map((tag) => (
          <li key={tag.id}>#{tag.name}</li>
        ))}
      </ul>
    </Link>
  </section>
);

export default EpigramCard;
