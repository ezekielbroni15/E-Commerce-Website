import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Camera,
  ChevronDown,
  CircleX,
  Gamepad2,
  Headphones,
  Heart,
  LogOut,
  Monitor,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Star,
  Trash2,
  Truck,
  UserRound,
  Watch,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Toggle from './components/Toggle'
import { products, wishlistProducts } from './data/products'
import { withAuth } from './hocs/withAuth'
import { useAuth } from './hooks/useAuth.jsx'
import { useForm } from './hooks/useForm'
import { addToCart, removeFromCart, updateQuantity } from './store/cartSlice'

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  'Electronics',
  'Home & Lifestyle',
  'Medicine',
  'Sports & Outdoor',
  "Baby's & Toys",
  'Groceries & Pets',
  'Health & Beauty',
]

const categoryIcons = [
  [Smartphone, 'Phones'],
  [Monitor, 'Computers'],
  [Watch, 'SmartWatch'],
  [Camera, 'Camera'],
  [Headphones, 'HeadPhones'],
  [Gamepad2, 'Gaming'],
]

function money(value) {
  return `$${value}`
}

function Header() {
  const cartCount = useSelector((state) =>
    Object.values(state.cart.items).reduce((total, quantity) => total + quantity, 0),
  )
  const wishlistCount = wishlistProducts.length

  return (
    <header>
      <div className="promo">
        <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
        <a href="#products">ShopNow</a>
        <span className="language">English <ChevronDown size={14} /></span>
      </div>
      <div className="nav-wrap">
        <Link className="brand" to="/">Exclusive</Link>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </nav>
        <div className="nav-actions">
          <label className="search">
            <input placeholder="What are you looking for?" />
            <Search size={20} />
          </label>
          <Link className="icon-link wishlist-badge" to="/wishlist" aria-label="Wishlist">
            <Heart size={23} />
            {wishlistCount > 0 && <span>{wishlistCount}</span>}
          </Link>
          <Link className="icon-link cart-badge" to="/cart" aria-label="Cart">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span>{cartCount}</span>}
          </Link>
          <AccountDropdown />
        </div>
      </div>
    </header>
  )
}

function AccountMenu() {
  const { logOut } = useAuth()
  return (
    <div className="account-menu">
      <Link to="/account"><UserRound size={18} />Manage My Account</Link>
      <Link to="/cart"><ShoppingBag size={18} />My Order</Link>
      <Link to="/account"><CircleX size={18} />My Cancellations</Link>
      <Link to="/wishlist"><Star size={18} />My Reviews</Link>
      <button type="button" onClick={logOut}><LogOut size={18} />Logout</button>
    </div>
  )
}

const ProtectedAccountMenu = withAuth(AccountMenu)

function AccountDropdown() {
  return (
    <Toggle
      render={(open, toggle) => (
        <div className="account-dropdown">
          <button className={`account-button ${open ? 'active' : ''}`} type="button" onClick={toggle} aria-label="Account">
            <UserRound size={20} />
          </button>
          {open && <ProtectedAccountMenu />}
        </div>
      )}
    />
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-col">
        <h3>Exclusive</h3>
        <h4>Subscribe</h4>
        <p>Get 10% off your first order</p>
        <label className="footer-input">
          <input placeholder="Enter your email" />
          <span>→</span>
        </label>
      </div>
      <div className="footer-col">
        <h4>Support</h4>
        <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>
      <div className="footer-col">
        <h4>Account</h4>
        <Link to="/account">My Account</Link>
        <Link to="/login">Login / Register</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
      </div>
      <div className="footer-col">
        <h4>Quick Link</h4>
        <a>Privacy Policy</a>
        <a>Terms Of Use</a>
        <a>FAQ</a>
        <a>Contact</a>
      </div>
      <div className="footer-col">
        <h4>Download App</h4>
        <p>Save $3 with App New User Only</p>
        <div className="download-app">
          <img className="qr-code" src="/assets/qr-code.png" alt="Exclusive app QR code" />
          <div className="store-buttons">
            <img src="/assets/google-play.svg" alt="Get it on Google Play" />
            <img src="/assets/app-store.svg" alt="Download on the App Store" />
          </div>
        </div>
        <div className="social-links" aria-label="Social links">
          <a aria-label="Facebook">
            <svg className="brand-icon facebook-mark" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.3 8.1V6.4c0-.8.2-1.3 1.4-1.3h1.7V2.2C16.6 2.1 15.7 2 14.6 2c-2.5 0-4.2 1.5-4.2 4.2v1.9H7.6v3.2h2.8V22h3.4V11.3h2.8l.4-3.2h-3.1Z" />
            </svg>
          </a>
          <a aria-label="Twitter"><span className="brand-icon twitter-mark">x</span></a>
          <a aria-label="Instagram">
            <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="5" />
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="16.8" cy="7.2" r="1" />
            </svg>
          </a>
          <a aria-label="LinkedIn"><span className="brand-icon linkedin-mark">in</span></a>
        </div>
      </div>
      <div className="footer-copy">© Copyright Rimel 2022. All right reserved</div>
    </footer>
  )
}

function SectionTitle({ eyebrow, title, action, controls = true, onPrev, onNext }) {
  return (
    <div className="section-heading">
      <div className="heading-copy">
        <p><span />{eyebrow}</p>
        <div className="title-line">
          <h2>{title}</h2>
          {controls && action}
        </div>
      </div>
      <div className="section-actions">
        {controls ? <ArrowControls onPrev={onPrev} onNext={onNext} /> : action}
      </div>
    </div>
  )
}

function ArrowControls({ onPrev, onNext }) {
  return (
    <div className="arrow-controls">
      <button type="button" onClick={onPrev} aria-label="Previous items"><ArrowLeft size={20} /></button>
      <button type="button" onClick={onNext} aria-label="Next items"><ArrowRight size={20} /></button>
    </div>
  )
}

function Rating({ value, reviews }) {
  return (
    <div className="rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={15} fill={index < value ? '#ffad33' : 'none'} stroke="#ffad33" />
      ))}
      <span>({reviews})</span>
    </div>
  )
}

function ProductCard({ product, removable = false }) {
  const dispatch = useDispatch()
  return (
    <article className="product-card">
      <div className="product-media">
        {product.discount && <span className="discount">{product.discount}</span>}
        {product.badge && <span className="new-badge">{product.badge}</span>}
        {removable ? (
          <button className="remove-button" type="button" aria-label="Remove wishlist item">
            <Trash2 size={18} />
          </button>
        ) : (
          <Toggle
            render={(liked, toggle) => (
              <button className="heart-button" type="button" onClick={toggle} aria-label="Toggle wishlist">
                <Heart size={18} fill={liked ? '#db4444' : 'none'} color={liked ? '#db4444' : '#111'} />
              </button>
            )}
          />
        )}
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <button type="button" onClick={() => dispatch(addToCart(product.id))}>Add To Cart</button>
      </div>
      <h3>{product.name}</h3>
      <div className="prices">
        <strong>{money(product.price)}</strong>
        {product.oldPrice && <span>{money(product.oldPrice)}</span>}
      </div>
      <Rating value={product.rating} reviews={product.reviews} />
    </article>
  )
}

function ProductCarousel({ items }) {
  const [start, setStart] = useState(0)
  const visibleCount = 5
  const visibleItems = Array.from({ length: Math.min(visibleCount, items.length) }, (_, index) => {
    return items[(start + index) % items.length]
  })

  const goPrev = () => setStart((current) => (current - 1 + items.length) % items.length)
  const goNext = () => setStart((current) => (current + 1) % items.length)

  return (
    <>
      <SectionTitle
        eyebrow="Today's"
        title="Flash Sales"
        onPrev={goPrev}
        onNext={goNext}
        action={
          <div className="timer">
            <span><small>Days</small>03</span>
            <b>:</b>
            <span><small>Hours</small>23</span>
            <b>:</b>
            <span><small>Minutes</small>19</span>
            <b>:</b>
            <span><small>Seconds</small>56</span>
          </div>
        }
      />
      <div className="product-strip">
        {visibleItems.map((product) => <ProductCard key={`${product.id}-${start}`} product={product} />)}
      </div>
    </>
  )
}

function Home() {
  return (
    <main>
      <section className="hero-section page-shell">
        <aside className="side-cats">
          {categories.map((category) => (
            <a key={category}>{category}</a>
          ))}
        </aside>
        <div className="hero-banner">
          <div>
            <p className="apple-line">Apple iPhone 14 Series</p>
            <h1>Up to 10% off Voucher</h1>
            <a href="#products">Shop Now →</a>
          </div>
          <img src="/assets/iphone-hero.png" alt="iPhone 14 Series" />
          <div className="hero-dots"><span /><span /><span className="active" /><span /><span /></div>
        </div>
      </section>
      <section className="page-shell block section-rule" id="products">
        <ProductCarousel items={products.slice(0, 8)} />
        <div className="center"><Link className="primary-btn" to="/wishlist">View All Products</Link></div>
      </section>
      <section className="page-shell block section-rule">
        <SectionTitle eyebrow="Categories" title="Browse By Category" />
        <div className="category-grid">
          {categoryIcons.map(([Icon, label]) => (
            <div className={`category-tile ${label === 'Camera' ? 'active' : ''}`} key={label}>
              <Icon size={32} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="page-shell block">
        <SectionTitle eyebrow="This Month" title="Best Selling Products" controls={false} action={<Link className="primary-btn small" to="/wishlist">View All</Link>} />
        <div className="product-grid">
          {products.slice(4, 8).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      <section className="page-shell music-band">
        <div>
          <p>Categories</p>
          <h2>Enhance Your Music Experience</h2>
          <div className="music-timer"><span>23<br />Hours</span><span>05<br />Days</span><span>59<br />Minutes</span><span>35<br />Seconds</span></div>
          <button type="button">Buy Now!</button>
        </div>
        <img src="/assets/speaker.jpg" alt="Speaker" />
      </section>
      <section className="page-shell block">
        <SectionTitle eyebrow="Our Products" title="Explore Our Products" />
        <div className="product-grid">
          {[products[12], products[8], products[13], products[14], products[15], products[9], products[0], products[10]]
            .filter(Boolean)
            .map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        <div className="center"><Link className="primary-btn" to="/wishlist">View All Products</Link></div>
      </section>
      <section className="page-shell block">
        <SectionTitle eyebrow="Featured" title="New Arrival" />
        <div className="arrival-grid">
          <div className="arrival-large">
            <img src="/assets/ps5.jpg" alt="PlayStation 5" />
            <h3>PlayStation 5</h3>
            <p>Black and White version of the PS5 coming out on sale.</p>
            <a>Shop Now</a>
          </div>
          <div className="arrival-side">
            <div className="arrival-wide">
              <img src="/assets/fashion.jpg" alt="Women's Collections" />
              <h3>Women's Collections</h3>
              <p>Featured woman collections that give you another vibe.</p>
              <a>Shop Now</a>
            </div>
            <div className="arrival-mini-grid">
              <div>
                <img src="/assets/speaker.jpg" alt="Speakers" />
                <h3>Speakers</h3>
                <p>Amazon wireless speakers</p>
              </div>
              <div>
                <img src="/assets/perfume.jpg" alt="Perfume" />
                <h3>Perfume</h3>
                <p>GUCCI INTENSE OUD EDP</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Services />
    </main>
  )
}

function Services() {
  return (
    <>
      <section className="services page-shell">
        <div><Truck size={34} /><h3>FREE AND FAST DELIVERY</h3><p>Free delivery for all orders over $140</p></div>
        <div><Headphones size={34} /><h3>24/7 CUSTOMER SERVICE</h3><p>Friendly 24/7 customer support</p></div>
        <div><ShieldCheck size={34} /><h3>MONEY BACK GUARANTEE</h3><p>We return money within 30 days</p></div>
      </section>
      <div className="back-to-top-wrap page-shell">
        <button
          className="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp size={22} />
        </button>
      </div>
    </>
  )
}

function AuthScreen({ mode }) {
  const navigate = useNavigate()
  const { signUp, logIn, loading, error } = useAuth()
  const isSignup = mode === 'signup'
  const form = useForm({
    initialValues: isSignup ? { name: '', email: '', password: '' } : { email: '', password: '' },
    fields: isSignup ? ['name', 'email', 'password'] : ['email', 'password'],
    onSubmit: async (values) => {
      if (isSignup) {
        await signUp(values)
        navigate('/login')
      } else {
        await logIn(values)
        navigate('/')
      }
    },
  })

  return (
    <main className="auth-page">
      <img src="/assets/auth.jpg" alt="Shopping cart and phone" />
      <form className={`auth-form ${isSignup ? 'signup-form' : 'login-form'}`} onSubmit={form.handleSubmit}>
        <h1>{isSignup ? 'Create an account' : 'Log in to Exclusive'}</h1>
        <p>Enter your details below</p>
        {isSignup && <Field name="name" placeholder="Name" form={form} />}
        <Field name="email" placeholder="Email or Phone Number" form={form} />
        <Field name="password" placeholder="Password" type="password" form={form} />
        {error && <small className="field-error">{error}</small>}
        {isSignup ? (
          <>
            <button className="primary-btn auth-submit" type="submit" disabled={loading}>Create Account</button>
            <button className="google-btn" type="button">
              <img src="/assets/google.svg" alt="" />
              Sign up with Google
            </button>
            <span>Already have account? <Link to="/login">Log in</Link></span>
          </>
        ) : (
          <div className="login-actions">
            <button className="primary-btn auth-login-btn" type="submit" disabled={loading}>Log In</button>
            <Link className="forgot" to="/signup">Forget Password?</Link>
          </div>
        )}
      </form>
    </main>
  )
}

function Field({ name, placeholder, type = 'text', form }) {
  return (
    <label className="field">
      <input name={name} type={type} placeholder={placeholder} value={form.values[name] || ''} onChange={form.handleChange} />
      {form.errors[name] && <small className="field-error">{form.errors[name]}</small>}
    </label>
  )
}

function Wishlist() {
  const wishlist = products.filter((product) => wishlistProducts.includes(product.id))
  return (
    <main className="page-shell inner-page wishlist-page">
      <div className="plain-heading wishlist-heading">
        <h1>Wishlist ({wishlist.length})</h1>
        <button type="button">Move All To Bag</button>
      </div>
      <div className="product-grid">
        {wishlist.map((product) => <ProductCard key={product.id} product={product} removable />)}
      </div>
      <div className="wishlist-subheading">
        <h2><span />Just For You</h2>
        <button type="button" className="outline-btn">See All</button>
      </div>
      <div className="product-grid">
        {products.slice(0, 4).map((product) => <ProductCard key={`just-${product.id}`} product={product} />)}
      </div>
    </main>
  )
}

function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = products.find((item) => item.id === id) || products[0]
  return (
    <main className="page-shell detail-page">
      <p className="breadcrumb">Account / Gaming / <strong>{product.name}</strong></p>
      <section className="detail-layout">
        <div className="thumbs">
          {[1, 2, 3, 4].map((item) => <div key={item}><img src={product.image} alt="" /></div>)}
        </div>
        <div className="detail-image"><img src={product.image} alt={product.name} /></div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <Rating value={product.rating} reviews={product.reviews} />
          <p className="detail-price">{money(product.price)}</p>
          <p>{product.description}</p>
          <hr />
          <div className="option-row"><span>Colours:</span><button className="swatch red" /><button className="swatch black" /></div>
          <div className="option-row sizes"><span>Size:</span>{['XS', 'S', 'M', 'L', 'XL'].map((size) => <button key={size}>{size}</button>)}</div>
          <div className="buy-row">
            <button type="button" onClick={() => dispatch(addToCart(product.id))}>Buy Now</button>
            <Toggle render={(liked, toggle) => <button className="outline-icon" type="button" onClick={toggle}><Heart fill={liked ? '#db4444' : 'none'} color={liked ? '#db4444' : '#111'} /></button>} />
          </div>
          <div className="delivery-box"><Truck size={24} /><div><strong>Free Delivery</strong><p>Enter your postal code for Delivery Availability</p></div></div>
          <div className="delivery-box"><PackageCheck size={24} /><div><strong>Return Delivery</strong><p>Free 30 Days Delivery Returns. Details</p></div></div>
        </div>
      </section>
    </main>
  )
}

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const cartDisplay = {
    monitor: { name: 'LCD Monitor', price: 650, image: '/assets/lcd-monitor.svg' },
    gamepad: { name: 'HI Gamepad', price: 550 },
  }
  const cartRows = Object.entries(items).map(([id, quantity]) => ({
    product: products.find((item) => item.id === id),
    display: cartDisplay[id],
    quantity,
  })).filter((row) => row.product)
  const subtotal = cartRows.reduce((sum, row) => sum + (row.display?.price || row.product.price) * row.quantity, 0)

  return (
    <main className="page-shell inner-page cart-page">
      <p className="breadcrumb">Home / <strong>Cart</strong></p>
      <div className="cart-table">
        <div className="cart-head"><span>Product</span><span>Price</span><span>Quantity</span><span>Subtotal</span></div>
        {cartRows.map(({ product, display, quantity }) => {
          const rowPrice = display?.price || product.price
          return (
          <div className="cart-row" key={product.id}>
            <span className="cart-product">
              <span className="cart-thumb">
                <img src={display?.image || product.image} alt="" />
                <button type="button" onClick={() => dispatch(removeFromCart(product.id))} aria-label={`Remove ${display?.name || product.name}`}>
                  <X size={12} />
                </button>
              </span>
              {display?.name || product.name}
            </span>
            <span>{money(rowPrice)}</span>
            <select className="cart-quantity" value={quantity} onChange={(event) => dispatch(updateQuantity({ id: product.id, quantity: Number(event.target.value) }))}>
              {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                <option key={value} value={value}>{String(value).padStart(2, '0')}</option>
              ))}
            </select>
            <span>{money(rowPrice * quantity)}</span>
          </div>
          )
        })}
      </div>
      <div className="cart-actions"><Link to="/">Return To Shop</Link><button type="button">Update Cart</button></div>
      <div className="cart-bottom">
        <div className="coupon"><input placeholder="Coupon Code" /><button type="button">Apply Coupon</button></div>
        <div className="cart-total"><h2>Cart Total</h2><p><span>Subtotal:</span>{money(subtotal)}</p><p><span>Shipping:</span>Free</p><p><span>Total:</span>{money(subtotal)}</p><button type="button">Process to checkout</button></div>
      </div>
    </main>
  )
}

function AccountPage() {
  const { user } = useAuth()
  return (
    <main className="page-shell inner-page account-page">
      <p>Welcome! <strong>{user?.displayName || 'Md Rimel'}</strong></p>
      <div className="account-grid">
        <aside><h3>Manage My Account</h3><a>My Profile</a><a>Address Book</a><a>My Payment Options</a><h3>My Orders</h3><a>My Returns</a><a>My Cancellations</a></aside>
        <form><h2>Edit Your Profile</h2><Field name="name" placeholder="Md Rimel" form={{ values: {}, errors: {}, handleChange: () => {} }} /><Field name="email" placeholder="rimel1111@gmail.com" form={{ values: {}, errors: {}, handleChange: () => {} }} /><button className="primary-btn" type="button">Save Changes</button></form>
      </div>
    </main>
  )
}

function NotFound() {
  return (
    <main className="page-shell not-found">
      <p className="breadcrumb">Home / 404 Error</p>
      <h1>404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
      <Link className="primary-btn" to="/">Back to home page</Link>
    </main>
  )
}

function Placeholder({ title }) {
  return <main className="page-shell not-found"><h1>{title}</h1><p>This screen is outside the Stage 6 build list.</p><Link className="primary-btn" to="/">Back home</Link></main>
}

const ProtectedWishlist = withAuth(Wishlist)
const ProtectedCart = withAuth(Cart)
const ProtectedAccount = withAuth(AccountPage)

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthScreen mode="signup" />} />
        <Route path="/login" element={<AuthScreen mode="login" />} />
        <Route path="/wishlist" element={<ProtectedWishlist />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ProtectedCart />} />
        <Route path="/account" element={<ProtectedAccount />} />
        <Route path="/contact" element={<Placeholder title="Contact" />} />
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}
